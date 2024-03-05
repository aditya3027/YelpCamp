const express=require('express');
const router=express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review=require('../models/review');
const ExpressError = require('../utils/ExpressError');
const { campgroundSchema , reviewSchema } = require('../schemas.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');


// Review Routes
router.post('/',isLoggedIn,validateReview,catchAsync(reviews.createReview))
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview));

// Exporting review routes
module.exports=router;