# INSTRUCTION-vercel.md
## Deploying Next.js Frontend on Vercel

This guide provides step-by-step instructions to deploy the `nextjs-client` frontend application from the `water-meter-ocr` project to Vercel.

---

## Prerequisites

1. **Vercel Account**:
   - Sign up or log in to your [Vercel](https://vercel.com/) account.

2. **Vercel CLI**:
   - Install the Vercel CLI:
     ```bash
     npm install -g vercel
     ```

3. **Project Setup**:
   - Ensure your `nextjs-client` application is properly configured and functional locally.
   - Navigate to the `nextjs-client` directory:
     ```bash
     cd water-meter-ocr/nextjs-client
     ```

---

## Deployment Steps

### 1. Initialize Deployment

Run the following command to initialize the deployment process:
```bash
vercel
```

--- 

### 2. Configure Deployment

Follow the prompts:

1. **Set up and deploy**:
   - Select `yes` to create a new project if not already linked.

2. **Scope**:
   - Choose your Vercel account or team.

3. **Project Name**:
   - Enter a valid name for the project (e.g., `water-meter-ocr-client`).

4. **Directory**:
   - Ensure the current directory (`./`) is selected.

5. **Project Settings**:
   - Use the auto-detected settings for a Next.js project:
     - Build Command: `next build`
     - Development Command: `next dev`
     - Install Command: `npm install`
     - Output Directory: `Next.js default`

6. **API Configuration**:
   - If your Next.js frontend communicates with the Flask backend, ensure the API endpoint (`/api/extract`) in `extract.js` points to your deployed Flask server URL.

--- 

### 3. Complete Deployment

After confirming the settings, Vercel will:

1. Build the project using `next build`.
2. Deploy the project and provide a live URL (e.g., `https://water-meter-ocr-client.vercel.app`).

--- 

### 4. Update API Endpoint (if needed)

If the Flask backend is deployed on a different server (e.g., Jetson Nano or AWS), ensure the `extract.js` file in the `pages/api/` folder has the correct endpoint. Update the `axios.post` URL to point to the Flask server, for example:

```javascript
const response = await axios.post('http://<your-flask-server-ip>:5001/ocr', {
  imageUrl: fileUrl,
});
```

Redeploy the frontend to Vercel after making this change:
```bash
vercel --prod
```

--- 

### 5. Verify Deployment

1. Open the live URL provided by Vercel.
2. Test the application by entering a file name and ensuring the communication with the Flask backend works.

### Additional Notes

- **Environment Variables**:
  If your Flask backend requires authentication or specific configurations, set them as environment variables in Vercel:
  ```bash
  vercel env add <KEY>
  ```

- **Re-deployment**:
  To make changes and redeploy, simply run:
  ```bash
  vercel
  ```

- **Logs and Debugging**:
  Check Vercel’s deployment logs in the dashboard for troubleshooting.

--- 
