const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        });

    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register');
    }
};

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back');
    const returnTo = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(returnTo);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You have been successfully logged out.');
    res.redirect('/campgrounds');
};