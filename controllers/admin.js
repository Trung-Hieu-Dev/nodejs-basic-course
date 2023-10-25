const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		path: "/admin/add-product",
		pageTitle: "Add Product",
		editing: false,
	});
};


exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const description = req.body.description;
	const price = req.body.price;
	const userId = req.user._id;

	const product = new Product({ title, price, imageUrl, description, userId })
	product
		.save()
		.then(() => {
			console.log('Created Product!')
			res.redirect('/admin/products')
		})
		.catch(err => console.log(err))
};



exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/");
	}
	const prodId = req.params.prodId;

	Product.findById(prodId)
		.then((prod) => {
			if (!prod) {
				return res.redirect("/");
			}
			res.render("admin/edit-product", {
				path: "/admin/edit-product",
				pageTitle: "Edit Product",
				editing: editMode,
				product: prod,
			});
		})
		.catch(err => console.log(err))
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedImageUrl = req.body.imageUrl;
	const updatedDescription = req.body.description;
	const updatedPrice = req.body.price;

	Product.findById(prodId)
		.then(product => {
			product.title = updatedTitle;
			product.price = updatedPrice;
			product.description = updatedDescription;
			product.imageUrl = updatedImageUrl;
			return product.save()
		})
		.then(result => {
			console.log('Updated Product!')
			res.redirect("/")
		})
		.catch(err => console.log(err))
};

exports.getProducts = (req, res, next) => {
	Product
		.find()
		// .select('title price -_id') // chose what you want to received. In this case, product data only: title, price except id
		// .populate('userId') // get user by relational userId
		.then(products => {
			// console.log(products); // products obj and user obj with userId
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin/products",
			}); // render template
		})
		.catch()
};

exports.getDeleteProduct = // /admin/products => GET
	(req, res, next) => {
		const prodId = req.body.productId;
		Product
			.findByIdAndRemove(prodId)
			.then(result => {
				res.redirect("/")
			})
			.catch(err => console.log(err))
	};
