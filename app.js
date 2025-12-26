if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./util/expressError.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./Routes/Listing.js");
const reviewRouter = require("./Routes/Review.js");
const userRouter = require("./Routes/user.js");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error is : " + err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const sessionOption = {
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.errormsg = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get("/registor", async (req, res) => {
//   let fakeUser = new User({
//     email: "arjun@gmail.com",
//     username: "Arjun",
//   });
//   let registorUser = await User.register(fakeUser, "arjun");
//   res.send(registorUser);
// });

//Route Sepreting
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.send("This is root dir");
});

//Error Handaling
app.use((req, res, next) => {
  next(new expressError(404, "page Not Found..!"));
});
app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong..!" } = err;
  res.status(status).render("listings/error.ejs", { err });
});

app.listen(8080, () => {
  console.log("App is listen port 8080 ");
});
