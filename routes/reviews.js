const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../contollers/reviews');
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

router.route('/')
    .post(isLoggedIn, validateReview, catchAsync(reviews.createReview));
router.route('/:reviewId')
    .delete(isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;