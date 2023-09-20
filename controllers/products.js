// data
const products = [];

exports.getAddProduct = (req, res, next) => {
	res.render("add-product", {
		path: "/admin/add-product",
		pageTitle: "Add Product",
		formCss: true,
		activeAddProduct: true,
	});
};

exports.postAddProduct = (req, res, next) => {
	// console.log(req.body);
	products.push({ title: req.body.title });
	res.redirect("/");
};

exports.getProducts = (req, res, next) => {
	res.render("shop", {
		prods: products,
		pageTitle: "Shop",
		path: "/",
		hasProducts: products.length > 0,
		productCss: true,
		activeShop: true,
	}); // render template
};
