const express = require("express");
const route = express.Router();

//Post Route
route.get("/", (req, res) => {
  res.send(" Get for post Route");
});
route.get("/:id", (req, res) => {
  res.send(" Get for post Id Route");
});

route.post("/", (req, res) => {
  res.send("post For post Route");
});
route.delete("/:id", (req, res) => {
  res.send("Delete For post Route");
});

module.exports = route;
