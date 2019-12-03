const mongoose = require('mongoose');
//const User = require('../models/user.model');



module.exports.index = (_, res) => {
    res.render('home/index');
}

module.exports.show = (_, res) => {
    res.render('maps/show');
}

module.exports.input = (_, res) => {
    res.render('maps/input');
}