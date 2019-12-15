// const express = require('express');
// const router = express.Router();
// const usersController = require('../controllers/users.controller')
// const baseController = require('../controllers/base.controller')
// const mapsController = require('../controllers/maps.controller')
// const authMiddleware = require('../middlewares/auth.middleware')
// const passport = require('passport');
// const upload = require('./cloudinary.config');

// module.exports = router;


// router.get('/home', baseController.index)
//     // router.get('/maps', baseController.show)
// router.get('/maps/new', mapsController.newMap)
// router.post('/maps', mapsController.create)
// router.get('/maps/:id', mapsController.details)

// // Lista de mapas router.get('/celebrities', controller.listCelebrities)

// router.get('/maps', mapsController.listMaps)

// router.get('/maps', baseController.show)
// router.post('/maps', mapsController.create)
// router.get('/maps/new', mapsController.newMap)
// router.get('/maps/:id', mapsController.details)

// // router.get('/', authMiddleware.isAuthenticated, mapsController.index)
// // router.get('/maps/:id', authMiddleware.isAuthenticated, mapsController.show)
// // router.post('/maps/:id/comments', authMiddleware.isAuthenticated, mapsController.addComment)
// // router.post('/maps/:id/like', authMiddleware.isAuthenticated, mapsController.like)
// // router.post('/maps', authMiddleware.isAuthenticated, upload.single('image'), mapsController.create)

// router.get('/users/new', /*authMiddleware.isNotAuthenticated,*/ usersController.new)
// router.post('/users', /*authMiddleware.isNotAuthenticated,upload.single('avatar'), */ usersController.create)
// router.get('/users/new', authMiddleware.isNotAuthenticated, usersController.new)
// router.post('/users', authMiddleware.isNotAuthenticated,upload.single('avatar'), usersController.create)
// router.post('/users/userDashboard', authMiddleware.isAuthenticated, usersController.createDashboard)
// router.get('/users/profile', authMiddleware.isAuthenticated, usersController.createDashboard)
// router.get('/users/:token/validate', usersController.validate)

// router.get('/login', authMiddleware.isNotAuthenticated, usersController.login)
// router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin)
// router.post('/logout', authMiddleware.isAuthenticated, usersController.logout)

// router.post('/google', authMiddleware.isNotAuthenticated, passport.authenticate('google-auth', { scope: ['openid', 'profile', 'email'] }));
// // router.post('/facebook', authMiddleware.isNotAuthenticated, passport.authenticate('facebook-auth', { scope: ['email'] }));
// //router.post('/slack', authMiddleware.isNotAuthenticated, passport.authenticate('slack-auth'));
// // router.get('/callback/:provider', authMiddleware.isNotAuthenticated, usersController.doSocialLogin);
// router.get('/auth/google/callback', usersController.doGoogleLogin);

// // router.get('/:username', authMiddleware.isAuthenticated, mapsController.profile)


const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const baseController = require('../controllers/base.controller')
const mapsController = require('../controllers/maps.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const passport = require('passport');
const upload = require('./cloudinary.config');

module.exports = router;


router.get('/home', baseController.index)
//router.get('/maps', baseController.show)
router.post('/maps', mapsController.create)
router.get('/maps', mapsController.listMaps)
router.get('/maps/new', mapsController.newMap)
router.get('/maps/:id', mapsController.details)
router.get('/maps/:id/edit', mapsController.edit);
router.post('/maps/:id/edit', mapsController.doEdit);
router.post('/maps/:id/delete', mapsController.deleteMap);
router.post('/maps/:id/comments', authMiddleware.isAuthenticated, mapsController.addComment)


// router.get('/', authMiddleware.isAuthenticated, mapsController.index)
// router.get('/maps/:id', authMiddleware.isAuthenticated, mapsController.show)
// router.post('/maps/:id/like', authMiddleware.isAuthenticated, mapsController.like)
// router.post('/maps', authMiddleware.isAuthenticated, upload.single('image'), mapsController.create)

router.get('/users/new', authMiddleware.isNotAuthenticated, usersController.new)
router.post('/users', authMiddleware.isNotAuthenticated,upload.single('avatar'), usersController.create)
router.post('/users/userDashboard', authMiddleware.isAuthenticated, usersController.createDashboard)

router.get('/users/profile', authMiddleware.isAuthenticated, usersController.createDashboard)
router.get('/users/editUser', usersController.edit);
router.post('/users/:id/edit', usersController.doEdit);
router.get('/users/:token/validate', usersController.validate)

router.get('/login', authMiddleware.isNotAuthenticated, usersController.login)
router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin)
router.post('/logout', authMiddleware.isAuthenticated,  usersController.logout)

router.post('/google', authMiddleware.isNotAuthenticated, passport.authenticate('google-auth', { scope: ['openid', 'profile', 'email'] }));
// router.post('/facebook', authMiddleware.isNotAuthenticated, passport.authenticate('facebook-auth', { scope: ['email'] }));
//router.post('/slack', authMiddleware.isNotAuthenticated, passport.authenticate('slack-auth'));
// router.get('/callback/:provider', authMiddleware.isNotAuthenticated, usersController.doSocialLogin);
router.get('/auth/google/callback', usersController.doGoogleLogin);

// router.get('/:username', authMiddleware.isAuthenticated, mapsController.profile)