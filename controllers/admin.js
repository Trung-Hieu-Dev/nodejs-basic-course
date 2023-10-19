const Product = require("../models/product");
const mongodb = require('mongodb')

const ObjectId = mongodb.ObjectId

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

	const product = new Product({ title, price, imageUrl, description })
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

	const product = new Product({
		title: updatedTitle,
		price: updatedPrice,
		imageUrl: updatedImageUrl,
		description: updatedDescription,
		id: new ObjectId(prodId)
	})

	product.save()
		.then(result => {
			console.log('Updated Product!')
			res.redirect("/")
		})
		.catch(err => console.log(err))
};

exports.getProducts = (req, res, next) => {
	Product
		.fetchAll()
		.then(products => {
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin/products",
			}); // render template
		})
		.catch()
};

// exports.getDeleteProduct = // /admin/products => GET
// 	(req, res, next) => {
// 		const prodId = req.body.productId;
// 		Product
// 			.findByPk(prodId)
// 			.then((prod) => {
// 				return prod.destroy() // delete product
// 			})
// 			.then(result => {
// 				console.log('Deleted Product!')
// 				res.redirect("/")
// 			})
// 			.catch(err => console.log(err))
// 	};
