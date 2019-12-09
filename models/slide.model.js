 
const mongoose = require('mongoose');
require('./texts.model')
require('./like.model')

const slideSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    long: {
         type: Number, max: 180, min: -180, default: 0 
    },
    lat: {
         type: Number, max: 90, min: -90, default: 0 
    },
    map: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Map'
    }

}, { timestamps: true })

// mapsSchema.pre('save', function (next) {
//   this.hashtags = this.body.match(/#[a-z]+/gi);
//   next()
// });

// tweetSchema.virtual('comments', {
//   ref: 'Comment',
//   localField: '_id',
//   foreignField: 'tweet',
//   justOne: false,
// });

// tweetSchema.virtual('likes', {
//   ref: 'Like',
//   localField: '_id',
//   foreignField: 'tweet',
//   justOne: false,
// });

const Slide = mongoose.model('Slide', slideSchema);

module.exports = Slide;