# INSTRUCTION-jetson-nano.md

## Deploying Flask Server on Jetson Nano

### **1. Prepare the Jetson Nano Environment**
1. Connect your Jetson Nano to the internet.
2. Update and upgrade the system:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

### **2. Install Required Software**
1. Install Python 3, pip3, and virtual environment tools:
   ```bash
   sudo apt install python3 python3-pip python3-venv -y
   ```

### **3. Transfer Flask App to Jetson Nano**
1. Use `scp` to copy your Flask app to the Jetson Nano:
   ```bash
   scp -r /path/to/flask-server username@<jetson_ip>:/path/to/deploy
   ```
   Example:
   ```bash
   scp -r ~/Downloads/water-meter-ocr/flask-server jetson@192.168.1.100:/home/jetson/flask-server
   ```

### **4. Set Up a Python Virtual Environment**
1. Navigate to the Flask app directory on the Jetson Nano:
   ```bash
   cd /path/to/flask-server
   ```
2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   ```
3. Activate the virtual environment:
   ```bash
   source venv/bin/activate
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### **5. Test the Flask App**
1. Run the Flask app locally:
   ```bash
   python3 app.py
   ```
2. Access the app in a browser using the Jetson Nano’s IP address:
   ```
   http://<jetson_ip>:5000
   ```

### **6. Set Up Gunicorn (Optional)**
1. Install Gunicorn:
   ```bash
   pip install gunicorn
   ```
2. Run the app with Gunicorn:
   ```bash
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```


### **7. Install Docker**
**Jetson Nano**:  
   Follow the official NVIDIA guide to install Docker:
   [Docker on Jetson](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html).

   ```bash
   sudo apt-get update
   sudo apt-get install -y docker.io
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

1. Add your user to the Docker group to run Docker commands without `sudo`:
   ```bash
   sudo usermod -aG docker $USER
   ```

2. Log out and log back in for changes to take effect.

---

### **8. Build the Docker Image**

1. Navigate to the Flask app directory where the `Dockerfile` is located:
   ```bash
   cd /path/to/flask-server
   ```

2. Build the Docker image:
   ```bash
   docker build -t flask-app .
   ```

---

### **9. Run the Docker Container**

1. Start the container:
   ```bash
   docker run -d -p 5000:5000 --name flask-app flask-app
   ```

   This maps the container's port 5000 to the host's port 5000.

2. Verify that the container is running:
   ```bash
   docker ps
   ```

---

### **10. Configure Nginx as a Reverse Proxy (Optional)**

If you want to use Nginx as a reverse proxy:

1. **Install Nginx**:
   ```bash
   sudo apt install nginx -y
   ```

2. **Create a new Nginx configuration**:
   ```bash
   sudo nano /etc/nginx/sites-available/flask-docker
   ```

   Add the following:
   ```nginx
   server {
       listen 80;
       server_name <instance_public_ip>;

       location / {
           proxy_pass http://127.0.0.1:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

3. **Enable the configuration**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/flask-docker /etc/nginx/sites-enabled
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. **Access the app**:
   ```
   http://<instance_public_ip>
   ```

#### **Advances**:
  
1. **Pre-Deployment Checks:**
   Add a step to ensure all necessary ports (e.g., 5000 for Flask, 80 for Nginx) are open:
   ```bash
   sudo ufw allow 5000
   sudo ufw allow 80
   ```

2. **Static IP Address:**
   Include a suggestion to assign a static IP to the Jetson Nano to avoid IP changes after reboots.

3. **GPU Usage Optimization (Optional):**
   If the app benefits from GPU acceleration, mention enabling CUDA for supported Python libraries:
   ```bash
   sudo apt-get install -y nvidia-cuda-toolkit
   ```

4. **Logging and Debugging:**
   Recommend setting up a log file for the Flask app to capture runtime logs:
   ```bash
   python app.py > app.log 2>&1 &
   ```

5. **Post-Deployment Security:**
   - Add a note about securing the server:
     - Disable root SSH login.
     - Use SSH keys for access.

---

### **11. Set Up Systemd for Auto-Start**
1. Create a systemd service file:
   ```bash
   sudo nano /etc/systemd/system/flask-app.service
   ```
   Add the following:
   ```ini
   [Unit]
   Description=Flask App
   After=network.target

   [Service]
   User=jetson
   WorkingDirectory=/path/to/flask-server
   ExecStart=/path/to/flask-server/venv/bin/python app.py
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```
2. Enable and start the service:
   ```bash
   sudo systemctl enable flask-app
   sudo systemctl start flask-app
   ```

---

### **12. Verify Deployment**
1. Check service logs:
   ```bash
   sudo journalctl -u flask-app -f
   ```
2. Access the app at:
   ```
   http://<jetson_ip>
   ```

---
