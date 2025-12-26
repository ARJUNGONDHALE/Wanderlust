const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../util/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLogin, isOwner, validateListing } = require("../middelware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");

const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLogin,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

router.get("/new", isLogin, listingController.renderNewForm);

router
  .route("/:id")
  .put(
    isLogin,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLogin, isOwner, wrapAsync(listingController.destroyListing))
  .get(wrapAsync(listingController.showListings));

//Edite Route
router.get(
  "/:id/edit",
  isLogin,
  isOwner,
  wrapAsync(listingController.renderEditeForm)
);

module.exports = router;
