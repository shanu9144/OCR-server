const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    filePath: { type: String, required: true },
    text: { type: String, required: true }
});

module.exports = mongoose.model('Image', ImageSchema);