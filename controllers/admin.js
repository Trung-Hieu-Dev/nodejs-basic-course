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

	/** using Sequelize to Insert Data & Create a Product into database */
	Product
		.create({
			title,
			price,
			imageUrl,
			description
		})
		.then(() => {
			console.log('Created Product!')
			res.redirect('/admin/products')
		})
		.catch(err => console.log(err))

	/* using mysql2
	const product = new Product(null, title, imageUrl, price, description);

	// inserting data into database
	product
		.save()
		.then(() => {
			res.redirect("/");
		})
		.catch(err => console.log(err));
	*/
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit; // get query param => admin/edit-product/0.7565587883598917?edit=true
	if (!editMode) {
		return res.redirect("/");
	}
	const prodId = req.params.prodId;

	/** using Sequelize to fetch a Product into database */
	Product
		.findByPk(prodId)
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

	// Product.findById(prodId, (prod) => {
	// 	if (!prod) {
	// 		return res.redirect("/");
	// 	}
	// 	res.render("admin/edit-product", {
	// 		path: "/admin/edit-product",
	// 		pageTitle: "Edit Product",
	// 		editing: editMode,
	// 		product: prod,
	// 	});
	// });
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedImageUrl = req.body.imageUrl;
	const updatedDescription = req.body.description;
	const updatedPrice = req.body.price;

	/** using Sequelize update a Product into database */
	Product
		.findByPk(prodId)
		.then((prod) => {
			prod.title = updatedTitle,
				prod.price = updatedPrice,
				prod.imageUrl = updatedImageUrl,
				prod.description = updatedDescription
			return prod.save() // update if item existed or create new one
		})
		.then(result => {
			console.log('Updated Product!')
			res.redirect("/")
		})
		.catch(err => console.log(err))

	// const updatedProduct = new Product(
	// 	prodId,
	// 	updatedTitle,
	// 	updatedImageUrl,
	// 	updatedPrice,
	// 	updatedDescription
	// );
	// updatedProduct.save();
	// res.redirect("/");
};

exports.getProducts = (req, res, next) => {
	/** using Sequelize to fetch data from database */
	Product
		.findAll()
		.then(products => {
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin/products",
			}); // render template
		})
		.catch()


	// Product
	// 	.fetchAll()
	// 	.then(([products]) => {
	// 		res.render("admin/products", {
	// 			prods: products,
	// 			pageTitle: "Admin Products",
	// 			path: "/admin/products",
	// 		}); // render template
	// 	})
	// 	.catch(err => err);


};

exports.getDeleteProduct = // /admin/products => GET
	(req, res, next) => {
		const prodId = req.body.productId;
		/** using Sequelize update a Product into database */
		Product
			.findByPk(prodId)
			.then((prod) => {
				return prod.destroy() // delete product
			})
			.then(result => {
				console.log('Deleted Product!')
				res.redirect("/")
			})
			.catch(err => console.log(err))

		// Product
		// 	.deleteById(prodId)
		// 	.then(() => {
		// 		res.redirect("/admin/products");
		// 	})
		// 	.catch(err => console.log(err));
	};
