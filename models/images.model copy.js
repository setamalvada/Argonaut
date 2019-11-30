const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
    title: String,
    slide: {
        type: Number,
        min: 1,
        max: 30,
    },
    map: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Map',
        required: true
    },

}, { timestamps: true })

const Image = mongoose.model('Image', imagesSchema);

module.exports = Image;