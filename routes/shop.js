const express = require("express");
const path = require("path");
const adminData = require("./admin");

const router = express.Router();
const rootDir = require("../utils/path");

router.get("/", (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));

  const products = adminData.products;
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    productCss: true,
    activeShop: true,
  }); // render template
});

module.exports = router;
