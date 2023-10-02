const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		path: "/admin/add-product",
		pageTitle: "Add Product",
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const description = req.body.description;
	const price = req.body.price;

	const product = new Product(title, imageUrl, price, description);
	product.save();
	res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit; // get query param => admin/edit-product/0.7565587883598917?edit=true
	if (!editMode) {
		return res.redirect("/");
	}
	res.render("admin/edit-product", {
		path: "/admin/edit-product",
		pageTitle: "Edit Product",
		editing: editMode,
	});
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("admin/products", {
			prods: products,
			pageTitle: "Admin Products",
			path: "/admin/products",
		}); // render template
	});
};
