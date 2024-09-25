// server.js
require('dotenv').config(); 
const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const cors = require('cors'); // Import CORS
const mongoose = require('mongoose'); // Import Mongoose
const dotenv = require('dotenv'); // Import dotenv for environment variables

//dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors()); // Enable CORS for all routes

const upload = multer({ dest: 'uploads/' });
app.use(express.json());

console.log('MONGODB_URI', process.env.DATABASE);

// MongoDB connection
mongoose.connect(process.env.DATABASE)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));



  
// Define a schema and model for images
const imageSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const Image = mongoose.model('images', imageSchema);

// Helper function to process an image using Tesseract.js
const processImage = (filePath, options) => {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(filePath, 'eng', options)
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
};

// Route to upload an image and extract text
app.post('/get-text', upload.single('image'), async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).send({ message: 'No image uploaded!' });
  }

  try {
    const result = await processImage(file.path, { logger: m => console.log(m) });
    
    // Save text to the database
    const imageText = new Image({ text: result.data.text });
    await imageText.save();

    res.status(200).send({ text: result.data.text });
  } catch (error) {
    res.status(500).send({ message: 'Error processing image!', error });
  }
});

// Route to extract bounding boxes of text elements from the image
app.post('/get-bboxes', upload.single('image'), async (req, res) => {
  const { file } = req;
  const { type } = req.body;

  if (!file || !type) {
    return res.status(400).send({ message: 'Image and type are required!' });
  }

  try {
    const result = await processImage(file.path, { logger: m => console.log(m) });
    
    const boxes = result.data.blocks.map(block => {
      if (block.type === type) {
        return {
          bbox: block.bbox,
          text: block.text,
          confidence: block.confidence,
        };
      }
    }).filter(Boolean);

    res.status(200).send({ boxes });
  } catch (error) {
    res.status(500).send({ message: 'Error processing image!', error });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
