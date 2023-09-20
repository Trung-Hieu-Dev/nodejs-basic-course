// data
const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
	res.render("add-product", {
		path: "/admin/add-product",
		pageTitle: "Add Product",
		formCss: true,
		activeAddProduct: true,
	});
};

exports.postAddProduct = (req, res, next) => {
	const product = new Product(req.body.title)
	product.save()
	res.redirect("/");
};

exports.getProducts = (req, res, next) => {
	const products = Product.fetchAll()
	res.render("shop", {
		prods: products,
		pageTitle: "Shop",
		path: "/",
		hasProducts: products.length > 0,
		productCss: true,
		activeShop: true,
	}); // render template
};
