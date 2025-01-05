
# INSTRUCTION-aws.md

## Deploying Flask Server on AWS

### **1. Launch an EC2 Instance**
1. Log in to the AWS Management Console.
2. Navigate to **EC2 Dashboard** and click on **Launch Instance**.
3. Configure the instance:
   - Select an AMI (e.g., Amazon Linux 2 or Ubuntu 20.04).
   - Choose an instance type (e.g., t2.micro for free tier).
   - (Optional) customize your storage (free tier allow upto 40 Gb (this app weighting around 1 Gb))
   - Configure key pair and security group (allow ports 22 (SSH), 80 (HTTP) and 5000 (custom TCP)).

---

### **2. Connect to the Instance**
1. SSH into the EC2 instance:
   ```bash
   ssh -i /path/to/key.pem ec2-user@<instance_public_ip>
   ```
   Example:
   ```bash
   ssh -i ~/mykey.pem ec2-user@ec2-34-224-214-23.compute-1.amazonaws.com
   ```

---

### **3. Install Required Software**
1. Update the instance:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
2. Install Python 3, pip, and virtual environment tools:
   ```bash
   sudo apt install python3 python3-pip python3-venv -y
   ```

---

### **4. Transfer Flask App to the Instance**
1. Copy the Flask app using `scp`:
   ```bash
   scp -r /path/to/flask-server ubuntu@<instance_public_ip>:/home/ubuntu/
   ```
2. If accessibility to any specific files are denied, grant user accessibility.
   ```
   chmod 400 /path/to/flask-server/any-file
   ```

---

### **5. Set Up the Flask App**
1. Navigate to the Flask app directory:
   ```bash
   cd /home/ubuntu/flask-server
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

---

### **6. Test the Flask App**
1. Run the app locally:
   ```bash
   python3 app.py
   ```
2. Access the app using the public IP:
   ```
   http://<instance_public_ip>:5000
   ```
3. Once the app is correctly set up, proceed to online deployment.

The Dockerfile you provided changes the way the Flask app is deployed. By using Docker, we no longer need Gunicorn or Nginx to be installed directly on the host machine, as they can be managed within the container itself. Here's the updated deployment instructions incorporating Docker:

---

### **7. Install Docker**  
**AWS Server**:   
   For Ubuntu instances:
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

### **10. Configure Nginx (Optional)**

If you still want to use Nginx as a reverse proxy:

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

---

### **11. Verify Deployment**

1. To check Docker container logs:
   ```bash
   docker logs flask-app
   ```

2. To restart the container:
   ```bash
   docker restart flask-app
   ```

3. Access the app:
   ```
   http://<instance_public_ip>:5000
   ```

---

### **12. Automate with Systemd**

To ensure the container starts on system reboot:

1. Create a systemd service file:
   ```bash
   sudo nano /etc/systemd/system/flask-docker.service
   ```

   Add the following:
   ```ini
   [Unit]
   Description=Dockerized Flask App
   Requires=docker.service
   After=docker.service

   [Service]
   Restart=always
   ExecStart=/usr/bin/docker start -a flask-app
   ExecStop=/usr/bin/docker stop -t 2 flask-app

   [Install]
   WantedBy=multi-user.target
   ```

2. Enable and start the service:
   ```bash
   sudo systemctl enable flask-docker
   sudo systemctl start flask-docker
   ```

3. Check service status:
   ```bash
   sudo systemctl status flask-docker
   ```

---