const mongoose = require('mongoose');
const Map = require('../models/maps.model');
const User = require('../models/user.model');
const Like = require('../models/like.model');
const Slide = require('../models/slide.model');

//newMap

module.exports.newMap = (_, res) => {
    res.render('maps/new');
}

module.exports.create = (req, res, next) => {
    const map = new Map({
        user: req.session.user._id,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        cathegory: req.body.cathegory
    })

    map.save()
        .then(map => {
            const slidesData = req.body.slides.map(slide => {
                return {
                    title: slide.title,
                    description: slide.description,
                    image: slide.image,
                    long: slide.long,
                    lat: slide.lat,
                    map: map._id
                }
            })

            Slide.create(slidesData)
                .then(slides => {
                    res.json(map)
                })
                .catch(next)
        })
        .catch(next)
}



// module.exports.details = (req, res, next) => {
//     Map.findOne({ _id: req.params.id })
//         .then(map => {
//             if (!map) {
//                 res.redirect('/home')
//             } else {
//                 res.render('maps/details', { map })
//             }
//         })
//         .catch(next)
// }

module.exports.details = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {

        Map.findById(id)
            .populate('slides')
            .then(
                map => {
                    res.render('maps/details', { map })
                }
            ).catch(
                error => next(error)
            );
    }
};




// module.exports.details = (req, res, next) => {
//     const id = req.params.id;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         next(createError(404));
//     } else {

//         Map.findById(id)
//             .then(
//                 map => {
//                     res.render('maps/details', { map })

//                 }
//             ).catch(
//                 error => next(error)
//             );

//         Slide.find({ map: id })
//             .then(
//                 slide => {
//                     res.render('maps/details', { slide })
//                 }

//             ).catch(
//                 error => next(error)
//             );

//     }
// };


module.exports.listMaps = (req, res, next) => {
    Map.find()

    .then(

        maps => {
            res.render('maps/index', { maps })

        }

    ).catch(
        error => next(error)
    );

};


// const Comment = require('../models/comment.model');

// module.exports.index = (req, res, next) => {
//   const criteria = req.query.search
//     ? {
//       body: new RegExp(req.query.search, "i")
//     }
//     : {}

//   Map.find(criteria)
//     .sort({ createdAt: -1 })
//     .limit(100)
//     .populate('user')
//     .populate('comments')
//     .populate('likes')
//     .then(tweets => {
//       res.render('tweets/index', { user: req.currentUser, tweets })
//     })
//     .catch(next)
// }

// module.exports.like = (req, res, next) => {
//   const params = { maps: req.params.id, user: req.currentUser._id }

//   Like.findOne(params)
//     .then(like => {
//       if (like) {
//         Like.findByIdAndRemove(like._id)
//           .then(() => {
//             res.json({ likes: -1 })
//           })
//           .catch(next)
//       } else {
//         const like = new Like(params)

//         like.save()
//           .then(() => {
//             res.json({ likes: 1})
//           })
//           .catch(next)
//       }
//     })
//     .catch(next)
// }

// module.exports.addComment = (req, res, next) => {
//   const tweetId = req.params.id

//   const comment = new Comment({
//     text: req.body.text,
//     user: req.currentUser._id,
//     maps: tweetId
//   })

//   comment.save()
//     .then(c => {
//       req.session.genericSuccess = 'comment created'
//       res.redirect(`/tweets/${tweetId}`)
//     })
//     .catch(() => {
//       req.session.genericError = 'error creating comment'
//       res.redirect(`/tweets/${tweetId}`)
//     })
// }

// module.exports.show = (req, res, next) => {
//   Map.findOne({ _id: req.params.id })
//     .populate('user')
//     .populate({
//       path: 'comments',
//       options: {
//         sort: {
//           createdAt: -1
//         }
//       },
//       populate: {
//         path: 'user'
//       }
//     })
//     .then(maps => {
//       if (maps) {
//         res.render('tweets/show', { tweet, user: maps.user })
//       } else {
//         req.session.genericError = 'maps not found'
//         res.redirect('/')
//       }
//     })
//     .catch(next)
// }

// module.exports.create = (req, res, next) => {
//   const maps = new Map({
//     user: req.currentUser._id,
//     body: req.body.body,
//     image: req.file ? req.file.url : undefined
//   })

//   maps.save()
//     .then(() => {
//       req.session.genericSuccess = "maps created"
//       res.redirect('/')
//     })
//     .catch(error => {
//       if (error instanceof mongoose.Error.ValidationError) {
//         req.session.genericError = "can't create maps"
//         res.redirect('/')
//       } else {
//         next(error);
//       }
//     })
// }

// module.exports.profile = (req, res, next) => {
//   User.findOne({ username: req.params.username })
//     .populate({
//       path: 'tweets',
//       populate: {
//         path: 'user'
//       }
//     })
//     .then(user => {
//       if (user) {
//         res.render('tweets/index', { user, tweets: user.tweets })
//       } else {
//         req.session.genericError = 'user not found'
//         res.redirect('/')
//       }
//     })
//     .catch(next)
// }