const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../util/wrapAsync.js");
const { isLogin } = require("../middelware.js");
const favouriteController = require("../controllers/favourite.js");

router
    .route("/add/:listingId")
    .post(isLogin, wrapAsync(favouriteController.addFavourite));

router
    .route("/remove/:listingId")
    .delete(isLogin, wrapAsync(favouriteController.removeFavourite));

module.exports = router;
