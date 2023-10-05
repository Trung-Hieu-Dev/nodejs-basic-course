// data
const Product = require("../models/product");
const Cart = require("../models/cart");

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
	Cart.getCart(cart => {
		Product.fetchAll(products => {
			const cartProducts = []
			for (const product of products) {
				const cartItem = cart.products.find(item => item.id === product.id)
				if (cartItem) {
					cartProducts.push({ productData: product, qty: cartItem.qty })
				}
			}
			console.log(cartProducts);
			res.render("shop/cart", {
				path: "/cart",
				pageTitle: "Cart",
				products: cartProducts
			});
		})
	})

};

exports.getPostCart = (req, res, next) => {
	const proId = req.body.productId;
	Product.findById(proId, (product) => {
		Cart.addProduct(proId, product.price);
		res.redirect("/cart");
	});
};

exports.getDeleteCart = (req, res, next) => {
	const proId = req.body.productId;
	Product.findById(proId, (product) => {
		Cart.deleteById(proId, product.price);
		res.redirect("/cart");
	});
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
