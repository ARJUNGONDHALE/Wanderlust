const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
  //.send("hellow");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({
      username,
      email,
    });
    const registorUser = await User.register(newUser, password);
    //signup that time user is automaticallya registor to the page
    req.login(registorUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", `Welcome to Wanderlust ${req.user.username}`);
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  // console.log(req.user);
  req.flash("success", `Welcome back, ${req.user.username} ...!`);
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You Are Logged out");
    res.redirect("/listings");
  });
};
