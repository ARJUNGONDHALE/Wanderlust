const express = require("express");
const route = express.Router();

//User Route
route.get("/", (req, res) => {
  res.send(" Get for User route");
});
route.get("/:id", (req, res) => {
  res.send(" Get for User Id route");
});

route.post("/", (req, res) => {
  res.send("post For user route");
});
route.delete("/:id", (req, res) => {
  res.send("Delete For User Route");
});

module.exports = route;
