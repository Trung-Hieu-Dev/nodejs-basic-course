const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

// /admin/edit-product/12345 => GET
router.get("/edit-product/:prodId", adminController.getEditProduct);

// /admin/edit-product => POST
router.post("/edit-product", adminController.postEditProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);

// /admin/products => POST
// router.post("/delete-product", adminController.getDeleteProduct);

module.exports = router;
