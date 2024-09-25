
## OCR-Server

An Optical Character Recognition (OCR) server built using Tesseract.js. This server processes images and extracts text using the Tesseract.js OCR library. The project is containerized using Docker for easy deployment.

![Screenshot](https://github.com/shanu9144/Ocr-server/blob/main/Screenshot%202024-09-25%20183808.png)  
![Screenshot](https://github.com/shanu9144/Ocr-server/blob/main/Recording%202024-09-25%20183914.mp4)  


## Features
Tesseract.js: JavaScript library for OCR processing.

Express.js: Backend API server to handle image uploads and OCR requests.

Docker: Containerized for easy deployment and consistent environment setup.

Mongoose: MongoDB integration to store the extracted text.

Multer: Middleware for handling image uploads.

## Requirements
Node.js (v14 or later)

Docker (Optional but recommended for containerization)

Tesseract.js (Installed via Node)

MongoDB: For storing the extracted text.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ocr-server.git
cd ocr-server

