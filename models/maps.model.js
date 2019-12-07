const mongoose = require('mongoose');
require('./texts.model')
require('./like.model')

const mapsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
    cathegory: {
        type: String
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

mapsSchema.virtual('slides', {
    ref: 'Slide',
    localField: '_id',
    foreignField: 'map',
    justOne: false
})

const Map = mongoose.model('Map', mapsSchema);

module.exports = Map;