# Water Meter OCR Application

This project is an advanced OCR (Optical Character Recognition) application designed to extract water meter values from images. It combines the power of YOLOv5 for field detection and VietOCR for character recognition, with a Next.js front end and a Flask back end.

Dành cho người dùng với ngôn ngữ tiếng Việt xem tại [đây](https://github.com/Lelekhoa1812/Water-Meter-Scanner/blob/main/README-vi.md)  

## 1. Features
- Preprocessing image with gray scaling and CLAHE techniques.
- Detects specific fields in water meter images using YOLOv5 (`yolov11xu.pt` model) and YOLOv11 (`yolov11l.pt` model).
- Extracts and recognizes text from each detected field using VietOCR (`vgg_transformer.pth` model).
- Handles missing values gracefully, logging debug messages for any undetected fields.
- Simple front-end interface for file input and visualization of extracted results.

Front-end interface:  
<img src="imgsrc/interface.png" alt="UI" style="width: 80%; max-width: 1000px;"> 

---

## 2. Technologies Used
- **Next.js**: Framework for the front end.
- **Flask**: Python framework for the back end.
- **YOLO**: Models v11l and v5xu for field detection.
- **VietOCR**: Model for text recognition.
- **Axios**: HTTP client for communication between Next.js and Flask.
- **Vercel**: Deployment platform for the Next.js front end.
- **Render**: Deployment platform for the Flash API back end.

---

## 3. File Structure
```
water-meter-ocr/
├── flask-server/            # Flask-based YOLO & VietOCR API server
│   ├── app.py               # Flask application file
│   ├── models/              # Folder containing YOLO and VietOCR models
│   │   ├── yolov11l.pt      # YOLOv11l model for field detection
│   │   ├── yolov5xu.pt      # YOLOv5xu model for field detection
│   │   └── vgg_transformer.pth # VietOCR model for text recognition
│   ├── requirements.txt     # Python dependencies for the server
│   └── static/              # Optional folder for any static assets (e.g., test images, temporary images)
│   └── vietocr/             # Clone into VietOCR for utilities
├── nextjs-client/           # Next.js frontend application
│   ├── pages/
│   │   ├── api/
│   │   │   └── extract.js   # API proxy to communicate with the Flask server
│   │   └── index.js         # Main UI for the application
│   ├── styles/              # Styles for the Next.js app
│   │   └── Home.module.css
├── dataset/                 # Example dataset to be trained with YOLO
│   ├── images/
│   │   └── train/
│   │   │   └── img1.jpg
│   │   │   └── img2.jpg
│   │   │   └── img3.jpg
│   ├── labels/
│   │   └── train/
│   │   │   └── img1.txt
│   │   │   └── img2.txt
│   │   │   └── img3.txt
│   ├── labelme/             # Manual label files with LabelMe
│   ├── config.yaml/         # YOLO config
│   ├── classes.txt/        
│   ├── convert_json_to_txt.py
```

---

## 4. Project Pipelines
Project Pipeline:  
<img src="imgsrc/pipeline.png" alt="Overall Pipeline" style="width: 80%; max-width: 1000px;">  

---

## 5. Installation and Setup
### Prerequisites
- Python 3.8+ installed for the Flask server.
- Node.js and npm installed for the Next.js client.
- A Vercel account for deployment.

### Setting Up the Flask Server
1. Navigate to the `flask-server/` directory:
   ```bash
   cd flask-server
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate # For Linux/Mac
   venv\Scripts\activate    # For Windows
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask server:
   ```bash
   python app.py
   ```
   The Flask server will be available at `http://localhost:5001`.

### Setting Up the Next.js Client
1. Navigate to the `nextjs-client/` directory:
   ```bash
   cd nextjs-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to access the application.

### Deployment on Vercel
1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy the Next.js client:
   ```bash
   cd nextjs-client
   vercel
   ```
   - Follow the prompts to link or create a new project.

3. Deploy the Flask server (optional):
   Host the Flask server on platforms like AWS, Render, or Heroku if you want it accessible online.

## How to Use
1. Navigate to the deployed application.
2. Input the file name or URL of the water meter image.
3. Click "Extract Data" to get the OCR results.
4. View extracted values for each field, labeled as `v1` to `v7`.

---

## 6. Model Configuration
### **YOLOv11L:**  
#### a. Configuration:  
```yaml
batch: -1                 # Specific batch size
cache: "ram"              # Use RAM for caching
device: "gpu"      
epochs: 300               # Train for more epochs
imgsize: 640              
patience: 100
lr0: 0.001                # Learning rate for stability
optimizer: "AdamW"        # Use AdamW optimizer
augment: True             # Enable advanced augmentations
weights: "yolov11l.pt"    # Start with pretrained weights
```

#### b. Model Evaluation:  
<img src="imgsrc/YOLOv11l.png" alt="YOLO v11 Large Model Evaluation" style="width: 70%; max-width: 1000px;">    

### **YOLOv5xu:**  
#### a. Configuration:  
```yaml
batch: 32                 # Specific batch size
cache: "ram"              # Use RAM for caching
device: "gpu"      
epochs: 300               # Train for more epochs
imgsize: 640              
patience: 100
lr0: 0.001                # Learning rate for stability
optimizer: "AdamW"        # Use AdamW optimizer
augment: True             # Enable advanced augmentations
weights: "yolov5xu.pt"    # Start with pretrained weights
```

#### b. Model Evaluation:  
<img src="imgsrc/YOLOv5xu.png" alt="YOLO v5 Ultra Model Evaluation" style="width: 70%; max-width: 1000px;">    

**Notation on choice of model:** Ultralytics YOLOv5u series is an advanced version of YOLOv5, integrating the anchor-free, objectness-free split head that enhances the accuracy-speed tradeoff for real-time object detection tasks. Unlike the traditional YOLOv5, YOLOv5u adopts an anchor-free detection mechanism, making it more flexible and adaptive in diverse scenarios.  

### Field Detection Output
Each detected field is labeled as `v1` to `v7` (e.g., `v1` for the first field, `v2` for the second, and so on).  

<img src="imgsrc/field_detection_example.png" alt="Example of field detection from input image" style="width: 70%; max-width: 1000px;">

---

### **VietOCR Configuration**
- **Model**: `vgg_transformer.pth`
- **Use**: Recognizes text in cropped fields detected by YOLO.
- **Training**: Fine-tuned on water meter datasets for better accuracy.   

**Usage:** Cloning into VietOCR by:
```
git clone https://github.com/pbcquoc/vietocr.git
```

---

### Example Output
The API returns a JSON object with field values:
```json
{
    "fields": {
        "v1": "123",
        "v2": "456",
        "v3": "",
        "v4": "789",
        "v5": "",
        "v6": "321",
        "v7": "654"
    }
}
```

### Example Output on UI  
UI Detection Loading:  
<img src="imgsrc/ui_loader.png" alt="Detection loading" style="width: 70%; max-width: 1000px;">  

UI Detection Output:  
<img src="imgsrc/ui_output.png" alt="Detection completed" style="width: 70%; max-width: 1000px;">   

## Debugging
If any field is undetected, or an unexpected output is extracted an error string (`X`) is returned for that field, and an error message is logged.

---

## Hosting and Deployments
The current website UI is hosted on Vercel [Water Meter](https://water-meter-scanner.vercel.app/) and Flask API server hosted on Render [Copy URL](https://watermeterflask.onrender.com).

**Follow this Instruction** to deploy NextJS Frontend on [Vercel](https://github.com/Lelekhoa1812/Water-Meter-Scanner/blob/main/nextjs-client/INSTRUCTION-vercel.md).  

**Follow this Instruction** to deploy Flask Server on [AWS](https://github.com/Lelekhoa1812/Water-Meter-Scanner/blob/main/flask-server/INSTRUCTION-aws.md).  

**Follow this Instruction** to deploy Flask Server on [Jetson Nano Server](https://github.com/Lelekhoa1812/Water-Meter-Scanner/blob/main/flask-server/INSTRUCTION-jetson-nano.md).  

---

Latest commit on 05/01/2025 | Author: Dang Khoa Le