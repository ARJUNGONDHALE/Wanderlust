const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const wrapAsync = require("../util/wrapAsync.js");
const Listing = require("../models/listing.js");
const { validateReview, isLogin, isReviewAuther } = require("../middelware.js");

const reviewController = require("../controllers/reviews.js");

//reviews
//post Rouat
router.post(
  "/",
  isLogin,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// Delete route
router.delete(
  "/:reviewId",
  isLogin,
  isReviewAuther,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
