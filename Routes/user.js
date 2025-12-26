process.noDeprecation = true; // Hide deprecation warnings permanently

const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../util/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middelware.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

//Login Router
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;
