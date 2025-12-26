const Listing = require("./models/listing.js");
let { listingSchema, ReviewSchema } = require("./schema.js");
const expressError = require("./util/expressError.js");
const Review = require("./models/review.js");

module.exports.isLogin = (req, res, next) => {
  // console.log(req);
  if (!req.isAuthenticated()) {
    //redirct URL
    req.session.redirectUrl = req.originalUrl;
    // console.log(req.url, "..", req.originalUrl);
    req.flash("error", "You must Be Logged in to create Listing..!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
    console.log(res.locals.redirectUrl);
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not Owner of this lisdting");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isReviewAuther = async (req, res, next) => {
  let { id, reviewId } = req.params;

  if (!res.locals.currUser) {
    req.flash("error", "You must be logged in");
    return res.redirect(`/listings/${id}`);
  }
  let review = await Review.findById(reviewId);

  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/listings/${id}`);
  }

  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not Owner of this Review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
//Schema Validation Error  Middelvare
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new expressError(400, error);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = ReviewSchema.validate(req.body);
  if (error) {
    throw new expressError(400, error);
  } else {
    next();
  }
};
