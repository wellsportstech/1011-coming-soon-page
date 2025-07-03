// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Used for making HTTP requests from Node.js

const app = express();
const PORT = 3001; // You can choose any available port, common choices are 3000, 3001, 5000, 8080

// Replace with your actual Google Apps Script Web App URL
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyJpBLsmj9Y33E4FZrt7N_Zp2RQSHwCmJYGBvoZqZWFccVjZFPDXyEba3qXcnIhmnsjIQ/exec';

// Middleware
// Enable CORS for your proxy server.
// You can restrict this to your frontend's origin in production:
// app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cors()); // For development, allow all origins

app.use(express.json()); // To parse JSON bodies from incoming requests

// Define the API endpoint that your React frontend will call
app.post('/submit-form-data', async (req, res) => {
  console.log('Received request from frontend:', req.body);
  try {
    // Forward the request to Google Apps Script
    const gasResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Note: You don't need to set 'Access-Control-Allow-Origin' here
        // because this is server-to-server communication.
      },
      body: JSON.stringify(req.body), // Send the JSON body received from the frontend
    });

    const gasData = await gasResponse.text(); // Google Apps Script usually responds with plain text or JSON string

    console.log('Response from Google Apps Script:', gasData);

    // Send the response back to your frontend
    res.status(gasResponse.status).send(gasData);

  } catch (error) {
    console.error('Error forwarding request to Google Apps Script:', error);
    res.status(500).json({ success: false, error: 'Internal server error during Google Apps Script communication.' });
  }
});

// Optional: A simple GET endpoint to confirm the server is running
app.get('/', (req, res) => {
  res.send('Chatbot Proxy Server is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server listening at http://localhost:${PORT}`);
  console.log(`Frontend should send requests to http://localhost:${PORT}/submit-form-data`);
});