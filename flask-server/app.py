# CURL command for direct post query on either local path or remote URL
# curl -X POST -H "Content-Type: application/json" -d '{"imageUrl":"/Users/khoale/Downloads/water-meter-ocr/flask-server/static/testimg1.jpg"}' http://localhost:5001/ocr
# curl -X POST -H "Content-Type: application/json" -d '{"imageUrl":"http://115.79.125.119:8081/donghonuoc/uploads/19112024101437.jpg"}' http://localhost:5001/ocr

import json
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from io import BytesIO
import os
import numpy as np
import traceback
from vietocr.tool.predictor import Predictor
from vietocr.tool.config import Cfg

# Flask application setup
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Ultralytics HUB API configuration prefixes
HUB_API_URL = "https://predict.ultralytics.com"
HUB_API_KEY = "" # Contact for API key
HUB_MODEL_URL = "https://hub.ultralytics.com/models/9MXNttLcuHXX2yFUN6Ym"

# VietOCR model setup
vietocr_config = Cfg.load_config_from_name('vgg_transformer')
vietocr_config['weights'] = './models/vgg_transformer.pth'
vietocr_config['device'] = 'cpu'  # Use 'cuda' for GPU if available
vietocr_config['predictor']['beamsearch'] = False
vietocr = Predictor(vietocr_config)

@app.route('/ocr', methods=['POST'])
def ocr_process():
    data = request.get_json()
    image_url = data.get('imageUrl')
    if not image_url:
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

            # Debugs and logs for error with fetching img action
            app.logger.info(f"Fetching image from URL: {image_url}")
            response = requests.get(image_url)
            if response.status_code != 200:
                app.logger.error(f"Failed to fetch image. Status code: {response.status_code}")
                return jsonify({'error': 'Failed to fetch image'}), 400

            img = Image.open(BytesIO(response.content))
            app.logger.info(f"Image format: {img.format}, Size: {img.size}, Mode: {img.mode}")
            print((f"Image format: {img.format}, Size: {img.size}, Mode: {img.mode}"))

        # Convert input img to RGB if necessary
        if img.mode != "RGB":
            img = img.convert("RGB")

        # Save the image temporarily for inference request
        temp_image_path = "static/temp_image.jpg"
        img.save(temp_image_path)

        if os.path.exists(temp_image_path):
            print(f"Temporary image saved successfully at {temp_image_path}")
        else:
            print(f"Failed to save temporary image at {temp_image_path}")

        # Send inference request to Ultralytics HUB
        with open(temp_image_path, "rb") as f:
            response = requests.post(
                    HUB_API_URL,
                    headers={"x-api-key": HUB_API_KEY},
                    data={
                        "model": HUB_MODEL_URL,
                        "imgsz": 640,
                        "conf": 0.25,
                        "iou": 0.45,
                    },
                    files={"file": f},
                )
        # Print debugs to check for response status and error
        print(f"Request sent to Ultralytics HUB: {response.url}")
        print(f"Status code: {response.status_code}")
        print(f"Response headers: {response.headers}")
        #  Try and catch error with the query's response body
        try:
            response.raise_for_status()
            print(f"Response JSON: {response.json()}")
        except requests.exceptions.RequestException as e:
            print(f"Error in API request: {e}")
            print(f"Response content: {response.content}")
            raise


        # Parse the inference results
        results = response.json()
        # Append and predict detection result
        detections = results['images'][0]['results']
        if not detections:
            print("No detections found in the image.")
        # Extra print debugs and comparison of detection body, can be commented
        # print(f"Raw inference results: {results}")
        # print(f"Detections: {detections}")

        fields = {} # Init empty field which will collect detection coordination
        for det in detections:
            box = det["box"]  # [x1, y1, x2, y2]
            cls = det["class"]  # Class index
            conf = det["confidence"]  # Confidence score

            x_min, y_min, x_max, y_max = box["x1"], box["y1"], box["x2"], box["y2"]
            field_name = f"v{int(cls) + 1}"  # Map class index to field name (v1 to v7)

            # Crop the field and recognize text
            cropped_img = img.crop((x_min, y_min, x_max, y_max))
            fields[field_name] = recognize_text(cropped_img)

        # Clean up temporary file
        if os.path.exists(temp_image_path):
            os.remove(temp_image_path)
        else:
            print(f"Temporary image {temp_image_path} was already deleted or not found.")

        return jsonify({'fields': fields})

    except requests.exceptions.RequestException as e:
        app.logger.error(f"Error during Ultralytics HUB request: {e}")
        return jsonify({'error': 'Failed to run inference via Ultralytics HUB'}), 500

    except Exception as e:
        app.logger.error(f"Error during OCR processing: {e}")
        app.logger.error(traceback.format_exc())
        return jsonify({'error': str(e)}), 500


def recognize_text(cropped_img):
    """
    Recognizes text in the cropped image using VietOCR and converts alphabetic characters to numeric equivalents.

    Args:
        cropped_img (PIL.Image): Cropped image containing text.

    Returns:
        str: Converted numeric text or "ERROR" if invalid characters are found.
    """
    char_map = {
        'S': '5',
        'D': '0',
        'O': '0',
        'Z': '2',
        'B': '8',
        'g': '9',
        'I': '1'
    }

    try:
        # Ensure input is a PIL.Image object
        if not isinstance(cropped_img, Image.Image):  # Check if not a PIL.Image
            cropped_img = Image.fromarray(np.array(cropped_img))  # Convert back to PIL.Image if necessary

        # Run OCR using VietOCR
        raw_text = vietocr.predict(cropped_img)

        # Convert characters based on the mapping
        converted_text = ""
        for char in raw_text:
            if char.isdigit():
                converted_text += char  # Keep numeric characters
            elif char in char_map:
                converted_text += char_map[char]  # Map alphabetic characters to numbers
            else:
                app.logger.error(f"Invalid character detected: {char}")
                return "ERROR"  # Flag as error if invalid character is found

        return converted_text
    except Exception as e:
        app.logger.error(f"Error recognizing text: {e}")
        return "ERROR"  # Return "ERROR" if recognition fails
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
