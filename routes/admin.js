const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct); // load creating form view

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct); // create product

// /admin/add-product/12345 => GET
router.get("/edit-product/:prodId", adminController.getEditProduct); // load edit form view

// /admin/products => GET
router.get("/products", adminController.getProducts);

module.exports = router;
