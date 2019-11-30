const mongoose = require('mongoose');
//const User = require('../models/user.model');

module.exports.index = (_, res) => {
    res.render('home/index');
}