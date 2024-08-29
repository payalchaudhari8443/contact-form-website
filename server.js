const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Prepare the data
    const formData = {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
    };

    // Append form data to the JSON file
    fs.appendFile('form-submissions.json', JSON.stringify(formData) + '\n', (err) => {
        if (err) {
            console.error('Error saving form data:', err);
            return res.status(500).json({ message: 'Failed to save data' });
        }

        // Respond with success
        res.json({ message: 'Form submitted and data saved successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
