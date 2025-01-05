# Water Meter OCR Application

This is the Flask API backend service for the Water Meter Scanner project. Checking the full content (Frontend with NextJS, backend NodeJS and Flask API) at: [Water Meter Scanner](https://github.com/Lelekhoa1812/Water-Meter-Scanner)

---

## **Procedures:**   
- Load image from URL. Catch exception when loading from frontend.
- Temporary save that image for processing steps in static/.
- Authenticate user with Google Cloud Service by the secret key.
- Load VietOCR frameworks and weight/model (from GCS) for text prediction.
- Preprocessing with grayscale and CLAHE techniques.
- Convert to RGB if necessary.
- Using YOLO model detecting the field. Catching undetected fields with class.
- Prepare response body, send to Ultralytic Hub inference.
- Prepare mapper of alphabetic characters detected to numeric.
- Recognize the text in each field with VIetOCR model. Catching error values by `ERROR` when it detect the number as an unmapped char, or `X` when undetectable (either by YOLO or VietOCR model at this stage).
- Prepare JSON object send to Backend JS.

---

## **Deployment:**   
**Follow this Instruction** to deploy Flask Server on [AWS](https://github.com/Lelekhoa1812/Water-Meter-Scanner/blob/main/flask-server/INSTRUCTION-aws.md)  

**Follow this Instruction** to deploy Flask Server on [Jetson Nano Server](https://github.com/Lelekhoa1812/Water-Meter-Scanner/blob/main/flask-server/INSTRUCTION-jetson-nano.md)  
