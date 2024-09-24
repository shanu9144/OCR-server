const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

const processImage = (filePath, options) => {
    return new Promise((resolve, reject) => {
      Tesseract.recognize(filePath, 'eng', options)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  };

  app.post('/get-text', upload.single('image'), async (req, res) => {
    const { file } = req;
    if (!file) {
      return res.status(400).send({ message: 'No image uploaded!' });
    }
  
    try {
      const result = await processImage(file.path, { logger: m => console.log(m) });
      res.status(200).send({ text: result.data.text });
    } catch (error) {
      res.status(500).send({ message: 'Error processing image!', error });
    }
  });

  app.post('/get-bboxes', upload.single('image'), async (req, res) => {
    const { file } = req;
    const { type } = req.body; // 'word', 'line', 'paragraph', 'block', 'page'
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
