# This script is for testing purposes with Google Cloud Services.

import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from vietocr.tool.predictor import Predictor
from vietocr.tool.config import Cfg

from PIL import Image
import numpy as np
import cv2
from io import BytesIO
from google.auth.transport.requests import AuthorizedSession
from google.oauth2.service_account import Credentials

# Flask application setup
app = Flask(__name__)
CORS(app)

# Paths and configurations
MODEL_DIR = "./models"
MODEL_NAME = "vgg_transformer.pth"
MODEL_PATH = os.path.join(MODEL_DIR, MODEL_NAME)

MODEL_URL = "https://storage.googleapis.com/water-meter-ocr-models/vgg_transformer.pth"
SERVICE_ACCOUNT_KEY_PATH = "key/water-meter-446604-9eb9b40f5f9d.json"  # Path to your service account JSON key

def download_model_from_gcs_authenticated(url, local_path, service_account_key_path):
    """
    Downloads a file from GCS with authentication.

    Args:
        url (str): GCS URL to the file.
        local_path (str): Local path to save the downloaded file.
        service_account_key_path (str): Path to the service account JSON key file.

    Raises:
        Exception: If an error occurs during the download process.
    """
    try:
        print(f"Authenticating with GCS and downloading model from {url}...")
        os.makedirs(os.path.dirname(local_path), exist_ok=True)

        # Authenticate using the service account key with appropriate scopes
        SCOPES = ["https://www.googleapis.com/auth/devstorage.read_only"]
        credentials = Credentials.from_service_account_file(service_account_key_path, scopes=SCOPES)
        authed_session = AuthorizedSession(credentials)

        # Perform the authenticated request
        response = authed_session.get(url, stream=True)

        if response.status_code == 200:
            with open(local_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print(f"Model downloaded successfully to {local_path}.")
        else:
            raise Exception(f"Failed to download model: {response.status_code}, {response.reason}")
    except Exception as e:
        app.logger.error(f"Error downloading model from GCS: {e}")
        raise

# Validate model file integrity
def validate_model_file(file_path):
    if not os.path.exists(file_path) or os.path.getsize(file_path) == 0:
        raise ValueError(f"Model file at {file_path} is corrupted or incomplete.")

# Setup VietOCR model
def setup_vietocr_model(model_path):
    config = Cfg.load_config_from_name('vgg_transformer')
    config['weights'] = model_path
    config['device'] = 'cpu'
    config['predictor']['beamsearch'] = False
    return Predictor(config)

# Ensure the model is available locally
if not os.path.exists(MODEL_PATH):
    download_model_from_gcs_authenticated(MODEL_URL, MODEL_PATH, SERVICE_ACCOUNT_KEY_PATH)
validate_model_file(MODEL_PATH)

vietocr = setup_vietocr_model(MODEL_PATH)

# Image preprocessing
def preprocess_image(pil_img):
    try:
        img = np.array(pil_img)
        img_gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        img_clahe = clahe.apply(img_gray)
        return Image.fromarray(img_clahe)
    except Exception as e:
        app.logger.error(f"Error during preprocessing: {e}")
        return pil_img

@app.route('/ocr', methods=['POST'])
def ocr_process():
    data = request.get_json()
    image_url = data.get('imageUrl')
    if not image_url:
        return jsonify({'error': 'Image URL is required'}), 400

    try:
        if os.path.isfile(image_url):
            img = Image.open(image_url)
        else:
            response = requests.get(image_url)
            if response.status_code != 200:
                return jsonify({'error': 'Failed to fetch image'}), 400
            img = Image.open(BytesIO(response.content))

        img = preprocess_image(img)
        if img.mode != "RGB":
            img = img.convert("RGB")

        text_result = vietocr.predict(img)
        return jsonify({'text': text_result})

    except Exception as e:
        app.logger.error(f"Error during OCR processing: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5001))
    # app.run(host='0.0.0.0', port=port) # Comment this to avoid mismatching of port when on deploying
