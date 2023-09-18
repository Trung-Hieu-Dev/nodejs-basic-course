const express = require("express");
const path = require("path");

const router = express.Router();
const rootDir = require("../utils/path");

router.get("/", (req, res, next) => {
  console.log("In the middleware");
  // res.send("<h1>Hello from Express</h1>");
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
