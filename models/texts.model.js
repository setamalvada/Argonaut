const mongoose = require('mongoose');

const textsSchema = new mongoose.Schema({
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

const Texts = mongoose.model('Texts', textsSchema);

module.exports = Texts;