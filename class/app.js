const express = require("express");
const app = express();
const user = require("./Routes/user");
const post = require("./Routes/post");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errormsg = req.flash("error");
  res.locals.name = req.session.name;
  next();
});

app.get("/registor", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  if (name === "anonymous") {
    req.flash("error", "Error User Not Registored");
  } else {
    req.flash("success", "User registored Sucssesful..!");
  }

  res.redirect("/hello");
});
app.get("/hello", (req, res) => {
  res.render("page.ejs");
});

app.get("/sessioncount", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send(`You Send The Request ${req.session.count} Time`);
});

app.get("/test", (req, res) => {
  res.send("Test Sucssesfull");
});

app.listen(3000, () => [console.log("App is listen port 3000")]);
