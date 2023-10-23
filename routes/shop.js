const express = require("express");
const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

// router.get("/cart", shopController.getCart);

router.post("/cart", shopController.getPostCart);

// router.post('/cart-delete-item', shopController.getDeleteCart)

// router.get("/orders", shopController.getOrders);

// router.post("/create-order", shopController.getPostOrder);

// router.get("/checkout", shopController.getCheckout);


module.exports = router;
