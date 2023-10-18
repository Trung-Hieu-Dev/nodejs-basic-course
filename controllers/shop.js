// data
const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
	/** using Sequelize to fetch data from database */
	Product
		.findAll()
		.then(products => {
			res.render("shop/product-list", {
				prods: products,
				pageTitle: "All Products",
				path: "/products",
			}); // render template
		})
		.catch()

	// Product.fetchAll().then(([rows, fieldData]) => { // destructuring [rows, fieldData] data from retrieved data from database
	// 	res.render("shop/index", {
	// 		prods: rows, // rows are products
	// 		pageTitle: "Shop",
	// 		path: "/",
	// 	}); // render template
	// }).catch(err => console.log(err));

};

exports.getProducts = (req, res, next) => {
	/** using Sequelize to fetch data from database */
	Product
		.findAll()
		.then(products => {
			res.render("shop/product-list", {
				prods: products,
				pageTitle: "All Products",
				path: "/products",
			}); // render template
		})
		.catch()

	// Product.fetchAll().then(([rows, fieldData]) => {
	// 	res.render("shop/product-list", {
	// 		prods: rows,
	// 		pageTitle: "All Products",
	// 		path: "/products",
	// 	});
	// }).catch(err => console.log(err));


};

//Loading Product Detail Data
exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;

	/** using Sequelize to fetch single data from database */
	Product.findByPk(prodId).then((product) => {
		res.render("shop/product-detail", {
			product: product,
			pageTitle: product.title,
			path: `/products`,
		});
	}).catch(err => console.log(err));

	// Product.findById(prodId).then(([product]) => {
	// 	res.render("shop/product-detail", {
	// 		product: product[0],
	// 		pageTitle: product[0].title,
	// 		path: `/products`,
	// 	});
	// }).catch(err => console.log(err));


};

exports.getCart = (req, res, next) => {
	req.user
		.getCart()
		.then(cart => {
			return cart
				.getProducts()
				.then(products => {
					res.render("shop/cart", {
						path: "/cart",
						pageTitle: "Cart",
						products: products
					});
				})
				.catch(err => console.log(err))
		})
		.catch(err => console.log(err))

	// Cart.getCart(cart => {
	// 	Product.fetchAll(products => {
	// 		const cartProducts = []
	// 		for (const product of products) {
	// 			const cartItem = cart.products.find(item => item.id === product.id)
	// 			if (cartItem) {
	// 				cartProducts.push({ productData: product, qty: cartItem.qty })
	// 			}
	// 		}
	// 		console.log(cartProducts);
	// 		res.render("shop/cart", {
	// 			path: "/cart",
	// 			pageTitle: "Cart",
	// 			products: cartProducts
	// 		});
	// 	})
	// })

};

exports.getPostCart = (req, res, next) => {
	const proId = req.body.productId;
	let fetchedCart;
	let newQuantity = 1
	req.user
		.getCart()
		.then(cart => {
			fetchedCart = cart
			return cart.getProducts({ where: { id: proId } })
		})
		.then(products => {
			let product;

			if (products.length > 0) {
				product = products[0]
			}

			if (product) {
				const oldQuantity = product.cartItem.quantity
				newQuantity = oldQuantity + 1
				return product
			}

			return Product.findByPk(proId)
		})
		.then((product) => {
			fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
			res.redirect("/cart")
		})
		.catch(err => console.log(err))


	// Product.findById(proId, (product) => {
	// 	Cart.addProduct(proId, product.price);
	// 	res.redirect("/cart");
	// });
};

exports.getDeleteCart = (req, res, next) => {
	const proId = req.body.productId;
	req.user.getCart()
		.then(cart => {
			return cart.getProducts({ where: { id: proId } })
		})
		.then(products => {
			const product = products[0]
			return product.cartItem.destroy()
		})
		.then(() => {
			res.redirect("/cart")
		})
		.catch(err => console.log(err))

	// Product.findById(proId, (product) => {
	// 	Cart.deleteById(proId, product.price);
	// 	res.redirect("/cart");
	// });
};

exports.getPostOrder = (req, res, next) => {
	req.user.getCart()
		.then(cart => {
			return cart.getProducts()
		})
		.then(products => {
			return req.user.createOrder()
				.then(order => {
					return order.addProduct(products.map(product => {
						product.orderItem = { quantity: product.cartItem.quantity }
						return product
					}))
				})
				.catch(err => console.log(err))
		})
		.then(result => console.log(result))
		.catch(err => err)
}

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
