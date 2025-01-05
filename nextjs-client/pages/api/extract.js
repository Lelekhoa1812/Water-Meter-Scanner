// backend nextjs-client/pages/api/extract.js
import axios from 'axios';

// const FLASK_API_URL = "https://watermeterflask.onrender.com/ocr"; // Render service URL
// const FLASK_API_URL = "http://127.0.0.1:5001/ocr"

const FLASK_API_URL = "http://ec2-34-224-214-23.compute-1.amazonaws.com:5000" // AWS service URL

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fileName } = req.body;

    if (!fileName) {
      return res.status(400).json({ message: 'File name is required.' });
    }

    const API_PREFIX_FETCH = "http://115.79.125.119:8081/donghonuoc/uploads/";
    const fileUrl = `${API_PREFIX_FETCH}${fileName}`;

    try {
      // Send request to Flask API
      console.log(`Sending request to Flask API: ${FLASK_API_URL} with imageUrl: ${fileUrl}`);
      const response = await axios.post(FLASK_API_URL, {
        imageUrl: fileUrl,
      });

      const result = response.data;
      console.log(`Flask API Response: ${JSON.stringify(result)}`);

      if (!result || !result.fields) {
        return res.status(500).json({ message: 'Failed to detect fields or values.' });
      }

      // Extract field values from the response
      const fieldValues = result.fields;
      const paddedValues = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7'].map(
        (field) => fieldValues[field] || 'X' // Pad missing fields with 'X'
      );

      // Debug log for missing fields with correct field names
      paddedValues.forEach((value, index) => {
        if (value === 'X') {
          console.error(`Error, cannot find value for field v${index + 1} in image ${fileName}.`);
        }
        if (index === 0) {
          value = 0; // Initial value usually 0 so match its exception
        }
      });

      return res.status(200).json({
        fileName,
        values: paddedValues.join(' '), // Join the values for simplicity
        missingFields: paddedValues
          .map((value, index) => (value === 'X' ? `v${index + 1}` : null)) // Identify missing fields
          .filter((v) => v !== null), // Filter out null values
      });

    // Catch error when processing image
    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ message: 'Failed to process the image.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
