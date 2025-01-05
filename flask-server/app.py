# CURL command for direct post query on either local path or remote URL
# curl -X POST -H "Content-Type: application/json" -d '{"imageUrl":"/Users/khoale/Downloads/water-meter-ocr/flask-server/static/testimg1.jpg"}' http://localhost:5001/ocr
# curl -X POST -H "Content-Type: application/json" -d '{"imageUrl":"http://115.79.125.119:8081/donghonuoc/uploads/19112024101437.jpg"}' http://localhost:5001/ocr
# For Render deployment:
# curl -X POST -H "Content-Type: application/json" -d '{"imageUrl":"http://115.79.125.119:8081/donghonuoc/uploads/19112024101437.jpg"}' https://watermeterflask.onrender.com/ocr

import json
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from io import BytesIO
import os
import numpy as np
import traceback
import cv2
from vietocr.tool.predictor import Predictor
from vietocr.tool.config import Cfg

# For remote deployment
# from google.cloud import vision
# from google.auth.transport.requests import AuthorizedSession
# from google.oauth2.service_account import Credentials

# Flask application setup
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Ultralytics HUB API configuration prefixes
HUB_API_URL = "https://predict.ultralytics.com"
HUB_API_KEY = "11d01d0022bc555c5206abe2ee3587b5ad5e85b66e" # Contact for API key
# Use this model for easier version compatibility and deployment (as at 01/01/2025)
# HUB_MODEL_URL = "https://hub.ultralytics.com/models/9MXNttLcuHXX2yFUN6Ym" # YOLOv5xu model
# Use this model for better accuracy
HUB_MODEL_URL = "https://hub.ultralytics.com/models/P7NNTwolndJ4wZR9bhQW" # YOLOv11l model


#### Download VietOCR model from GCS with authentication processes to predict with preset parameters for better accuracy
# Paths and configurations
MODEL_DIR = "./models"
MODEL_NAME = "vgg_transformer.pth"
MODEL_PATH = os.path.join(MODEL_DIR, MODEL_NAME)
# GCS API Key
MODEL_URL = "https://storage.googleapis.com/water-meter-ocr-models/vgg_transformer.pth"
TEXT_API_KEY_JSON = os.getenv("GCLOUD_SERVICE_ACCOUNT_KEY")
# If not found JSON
if not TEXT_API_KEY_JSON:
    raise ValueError("Google Cloud service account key not found in environment variables")
# Write the key to a temporary file
SERVICE_ACCOUNT_KEY_PATH = "/tmp/service_account_key.json"
with open(SERVICE_ACCOUNT_KEY_PATH, "w") as key_file:
    key_file.write(TEXT_API_KEY_JSON)
# Set the environment variable for Google Cloud API authentication
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = SERVICE_ACCOUNT_KEY_PATH
# Direct usage when deploying locally with key file (must be commented)
SERVICE_ACCOUNT_KEY_PATH = "key/water-meter-446604-9eb9b40f5f9d.json"  # Path to your service account JSON key

# Download model from Google Cloud Service
# def download_model_from_gcs_authenticated(url, local_path, service_account_key_path):
#     """
#     Downloads a file from GCS with authentication.

#     Args:
#         url (str): GCS URL to the file.
#         local_path (str): Local path to save the downloaded file.
#         service_account_key_path (str): Path to the service account JSON key file.

#     Raises:
#         Exception: If an error occurs during the download process.
#     """
#     try:
#         print(f"Authenticating with GCS and downloading model from {url}...")
#         os.makedirs(os.path.dirname(local_path), exist_ok=True)
#         # Authenticate using the service account key with appropriate scopes
#         SCOPES = ["https://www.googleapis.com/auth/devstorage.read_only"]
#         credentials = Credentials.from_service_account_file(service_account_key_path, scopes=SCOPES)
#         authed_session = AuthorizedSession(credentials)
#         # Perform the authenticated request
#         response = authed_session.get(url, stream=True)
#         # Check status when download and write the file
#         if response.status_code == 200:
#             with open(local_path, 'wb') as f:
#                 for chunk in response.iter_content(chunk_size=8192):
#                     f.write(chunk)
#             print(f"Model downloaded successfully to {local_path}.")
#         else:
#             raise Exception(f"Failed to download model: {response.status_code}, {response.reason}")
#     except Exception as e:
#         app.logger.error(f"Error downloading model from GCS: {e}")
#         raise
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
# if not os.path.exists(MODEL_PATH):
#     download_model_from_gcs_authenticated(MODEL_URL, MODEL_PATH, SERVICE_ACCOUNT_KEY_PATH)
validate_model_file(MODEL_PATH)
# Call setup
vietocr = setup_vietocr_model(MODEL_PATH)
####

# Apply preprocess steps to improve prediction under edge case constraints
def preprocess_image(pil_img):
    """
    Preprocesses the input PIL image:
    - Converts to grayscale
    - Applies CLAHE (Contrast Limited Adaptive Histogram Equalization) for brightness normalization
    - Resizes the image if necessary

    Args:
        pil_img (PIL.Image): Input image.

    Returns:
        PIL.Image: Preprocessed image.
    """
    try:
        print("Preprocessing image in progress...")
        # Convert PIL image to OpenCV format
        img = np.array(pil_img)
        img_gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)

        # Apply CLAHE
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        img_clahe = clahe.apply(img_gray)

        # Convert back to PIL.Image
        return Image.fromarray(img_clahe)
    except Exception as e:
        app.logger.error(f"Error during preprocessing: {e}")
        return pil_img  # Return original image if preprocessing fails


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
        
        '''
        Preprocess the image (CLAHE and normalization)
        This may compute upto 5s preprocessing the image under brightness uncertainties
        '''
        img = preprocess_image(img) # Remove to reduce runtime but also reduce prediction coverages

        # Convert input img to RGB if necessary
        # if img.mode != "RGB":
        #     img = img.convert("RGB")

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
        # print(f"Response headers: {response.headers}")
        # Try and catch error with the query's response body
        try:
            response.raise_for_status()
            # print(f"Response JSON: {response.json()}")
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

            # Tracing which field has been detected
            print(f"v{int(cls) + 1} has value")

            # Crop the field and recognize text
            cropped_img = img.crop((x_min, y_min, x_max, y_max))
            fields[field_name] = recognize_text(cropped_img)

        # Clean up temporary file
        if os.path.exists(temp_image_path):
            os.remove(temp_image_path)
        else:
            print(f"Temporary image {temp_image_path} was already deleted or not found.")
        print("--FIN-SESSION--") # Finish a session
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
    # Mapping detecting alphabetic chars to numeric (add more if found or adjust if needed)
    char_map = {
        'S': '5', 's': '5',
        'D': '0', 'O': '0',
        'Z': '2',
        'B': '8',
        'g': '9', 'G': '6',
        'I': '1', 'l': '1',
        'A': '4',
        'Q': '0',
        'T': '1', # These mapping from here should be check and tested 
        'E': '3',
        'a': '0',
        'C': '0',
    }
    # Debugging step
    print(f"Text recognition in progress...")

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
                converted_text += char_map[char] # Map alphabetic characters to numbers
            else:
                app.logger.error(f"Invalid character detected: {char}")
                return "ERROR"  # Flag as error if invalid character is found

        return converted_text
    except Exception as e:
        app.logger.error(f"Error recognizing text: {e}")
        return "ERROR"  # Return "ERROR" if recognition fails
    

if __name__ == '__main__':
    # port = int(os.environ.get("PORT", 5001))  # Default to 5001 if no PORT is provided
    port = int(os.environ.get("PORT", 5000))  # Default to 5000 for Flask app
    app.run(host='0.0.0.0', port=port)
    print("--END-SESSION--") # Terminate all session
