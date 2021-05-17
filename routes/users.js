const express = require('express');
const router = express.Router({ mergeParams: true });
const users = require('../contollers/users');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.route('/logout')
    .get(users.logout);

module.exports = router;