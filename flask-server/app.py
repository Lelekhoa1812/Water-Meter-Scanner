from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import torch
from vietocr.tool.predictor import Predictor
from vietocr.tool.config import Cfg
import requests
from io import BytesIO
import traceback
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load YOLO model for field detection
yolo_model = torch.hub.load('ultralytics/yolov5', 'custom', path='models/yolov11l.pt')

# Load VietOCR model for text recognition
config = Cfg.load_config_from_name('vgg_transformer')
config['weights'] = 'models/vgg_transformer.pth'
config['device'] = 'cuda' if torch.cuda.is_available() else 'cpu'
vietocr = Predictor(config)

@app.route('/ocr', methods=['POST'])
def ocr_process():
    data = request.get_json()
    image_url = data.get('imageUrl')
    if not image_url:
        app.logger.error("No image URL provided.")
        return jsonify({'error': 'Image URL is required'}), 400

    try:
        # Check if input is a local file path
        if os.path.isfile(image_url):
            normalized_path = os.path.abspath(image_url)
            app.logger.info(f"Processing local file: {normalized_path}")
            img = Image.open(normalized_path)
        else:
            # Process as a remote URL
            if not image_url.startswith(('http://', 'https://')):
                return jsonify({'error': 'Invalid URL or file path'}), 400

            app.logger.info(f"Fetching image from URL: {image_url}")
            response = requests.get(image_url)
            if response.status_code != 200:
                app.logger.error(f"Failed to fetch image. Status code: {response.status_code}")
                return jsonify({'error': 'Failed to fetch image'}), 400

            img = Image.open(BytesIO(response.content))
            app.logger.info(f"Image format: {img.format}, Size: {img.size}, Mode: {img.mode}")

        # Convert to RGB if necessary
        if img.mode != "RGB":
            img = img.convert("RGB")
            app.logger.info("Converted image to RGB mode.")

        # Perform field detection using YOLO
        img_array = np.array(img)
        results = yolo_model(img_array)
        detections = results.xyxy[0].numpy()  # Get bounding boxes and classes

        app.logger.info(f"YOLO detections: {detections}")

        field_values = {}
        for det in detections:
            x_min, y_min, x_max, y_max, conf, cls = det
            class_name = f"v{int(cls) + 1}"  # Map class index to field name (v1 to v7)

            # Crop detected field
            cropped_img = img.crop((x_min, y_min, x_max, y_max))

            # Recognize text in the cropped field using VietOCR
            cropped_img = cropped_img.convert("RGB")  # Ensure compatibility with VietOCR
            text = vietocr.predict(np.array(cropped_img))
            field_values[class_name] = text

        app.logger.info(f"Field values: {field_values}")

        # Return the results as JSON
        return jsonify({'fields': field_values})

    except Exception as e:
        app.logger.error(f"Error during OCR processing: {e}")
        app.logger.error(traceback.format_exc())
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
