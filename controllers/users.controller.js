const User = require('../models/user.model');
const Map = require('../models/maps.model');
const mongoose = require('mongoose');
const mailer = require('../config/mailer.config');
const passport = require('passport');

module.exports.new = (_, res) => {
    res.render('users/new', { user: new User() })
}

 module.exports.create = (req, res, next) => {
     const user = new User({
         username: req.body.username,
         name: req.body.name,
         surName:req.body.surName,
         email: req.body.email,
         password: req.body.password,
         repeatPassword: req.body.repeatPassword,
         avatar: req.file ? req.file.url : undefined,
         bio: req.body.bio
     })

     console.log(user)

    user.save()
        .then((user) => {
            mailer.sendValidateEmail(user)
            res.redirect('/login')
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('users/new', { user, error: error.errors })
            } else if (error.code === 11000) {
                res.render('users/new', {
                    user: {
                        ...user,
                        password: null
                    },
                    genericError: 'User exists'
                })
            } else {
                next(error);
            }
        })
}

module.exports.validate = (req, res, next) => {
    User.findOne({ validateToken: req.params.token })
        .then(user => {
            if (user) {
                user.validated = true
                user.save()
                    .then(() => {
                        res.redirect('/users/profile')
                    })
                    .catch(next)
            } else {
                res.redirect('users/new')
            }
        })
        .catch(next)
}

module.exports.login = (_, res) => {
    res.render('users/login')
}

module.exports.doGoogleLogin = (req, res, next) => {
    const socialProvider = req.params.provider

    passport.authenticate('google-auth', (error, user) => {
        if (error) {
            next(error);
        } else {
            req.session.user = user;
            res.redirect('/users/profile')
        }
    })(req, res, next);
}

module.exports.doLogin = (req, res, next) => {
    const { email, password/*, repeatPassword */} = req.body
    if (!email || !password /*|| !repeatPassword*/) {
        return res.render('users/login', { user: req.body })
    }

    User.findOne({ email: email, validated: true })
        .then(user => {
            if (!user) {
                res.render('users/login', {
                    user: req.body,
                    error: { password: 'invalid password' }
                })
            } else {
                /*if(password!= repeatPassword){
                    res.render('users/login', {
                        user: req.body,
                        error: { password: 'invalid password' }
                    })
                } else {*/
                    return user.checkPassword(password)
                    .then(match => {
                        if (!match) {
                            res.render('users/login', {
                                user: req.body,
                                error: { password: 'invalid password' }
                            })
                        } else {
                            req.session.user = user;
                            // req.session.genericSuccess = 'Welcome!'
                            //res.render('users/userDashboard', {user: req.body});
                            res.redirect('/users/profile');
                        }
                    })
                //}
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('users/login', {
                    user: req.body,
                    error: error.error
                })
            } else {
                next(error);
            }
        });
}

module.exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}

// module.exports.createDashboard = (_, res) => {
//     res.render('users/userDashboard')
// }

module.exports.createDashboard = (req, res, next) => {
    Map.find()
    .then(
        maps => {
            res.render('users/userDashboard', { maps })
        }
    ).catch(
        error => next(error)
    );
}

module.exports.edit = (req, res, next) => {
    const id = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        error => next(error)
    } else {
        User.findById(id)
            .then(
                user => {
                    res.render('users/editUser', { user })
                }
            ).catch(
                error => next(error)
            );
    }
  }
  
  module.exports.doEdit = (req, res, next) => {
    const id = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        error => next(error)
    } else {
        User.findByIdAndUpdate(id, req.body, { new: true })
            .then(user => {
                res.redirect('/users/userDashboard')
            })
            .catch(
                error => next(error)
            )
    }
  }