const mongoose = require('mongoose');
const Map = require('../models/maps.model');
const User = require('../models/user.model');
const Like = require('../models/like.model');
const Slide = require('../models/slide.model');
const Comment = require('../models/comment.model');

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
            console.log(slidesData)
            Slide.create(slidesData)
                .then(slides => {
                    res.json(map)
                })
                .catch(next)




        })
        .catch(next)
}





module.exports.details = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Map.findById(id)
            .populate('slides')
            .populate({
                path: 'comments',
                options: {
                    sort: {
                        createdAt: -1
                    }
                },
                populate: {
                    path: 'user'
                }
            })
            .then(map => {
                console.info('MAP => ', map) || res.render('maps/details', { map })
            })
            .catch(error => next(error));




    }
};









module.exports.deleteMap = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Map.findByIdAndDelete(id)
            .then(mapDeleted => {
                console.log('Map deleted => ', mapDeleted)
                res.redirect('/maps')
            })
            .catch(error => next(error))
    }
}

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
            console.log(slidesData)
            Slide.create(slidesData)
                .then(slides => {
                    res.json(map)
                })
                .catch(next)
        })
        .catch(next)
}

/**
 Promise.all(slides.map(slide => {
    return Slide.findByIdAndUpdate(slide.id, field: field, { new: true })
 }))
    .then(result => [])
    .catch(catch)
 */













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





module.exports.addComment = (req, res, next) => {
    const mapId = req.params.id

    const comment = new Comment({
        text: req.body.text,
        user: req.currentUser._id,
        maps: mapId
    })

    console.log('map id => ', mapId)
    console.log('comment object => ', comment)

    comment.save()
        .then(c => {
            console.info('new comment => ', c)
            Map.findByIdAndUpdate({ _id: mapId }, { $push: { comments: c.id } }, { new: true })
                .then(result => console.info(result))
                .catch(error => console.info('Error => ', error))

            req.session.genericSuccess = 'comment created'
            res.redirect(`/maps/${mapId}`)
        })
        .catch((error) => {
            console.info('ERROR => ', error)
            req.session.genericError = 'error creating comment'
            res.redirect(`/maps/${mapId}`)
        })
}

module.exports.edit = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Map.findById(id)
            .populate('slides')
            .then(
                map => {
                    res.render('maps/edit', { map })
                }
            ).catch(
                error => next(error)
            );
    }
}

module.exports.doEdit = (req, res, next) => {
    const id = req.params.id;
    console.info('body => ', req.body)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Map.findByIdAndUpdate(id, req.body, { new: true })
            .then(map => {
                console.log(map)
                res.redirect('/maps')
            })
            .catch(
                error => next(error)
            )
    }
}