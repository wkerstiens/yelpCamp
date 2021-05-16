const ExpressError = require('./utils/expressError');
const { campgroundSchema, reviewSchema } = require('./schemas');
const catchAsync = require('./utils/catchAsync');
const Campground = require('./models/campground');
const Review = require('./models/review');


module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be signed in first.');
    res.redirect('/login');
};

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

module.exports.isAuthor = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that.');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
});

module.exports.isReviewAuthor = catchAsync(async (req, res, next) => {
    const { reviewId, id } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that.');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
});