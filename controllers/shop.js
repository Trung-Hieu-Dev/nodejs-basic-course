// data
const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("shop/index", {
			prods: products,
			pageTitle: "Shop",
			path: "/",
		}); // render template
	});
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("shop/product-list", {
			prods: products,
			pageTitle: "All Products",
			path: "/products",
		}); // render template
	});
};

//Loading Product Detail Data
exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findById(prodId, (prod) => {
		res.render("shop/product-detail", {
			product: prod,
			pageTitle: prod.title,
			path: `/products`,
		});
	});
};

exports.getCart = (req, res, next) => {
	res.render("shop/cart", {
		path: "/cart",
		pageTitle: "Cart",
	});
};

exports.postCart = (req, res, next) => {
	const proId = req.body.productId;
	console.log(proId);
	res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
	res.render("shop/orders", {
		path: "/orders",
		pageTitle: "Orders",
	});
};

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		path: "/checkout",
		pageTitle: "Checkout",
	});
};
