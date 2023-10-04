// data
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
	Product.fetchAll().then(([rows, fieldData]) => { // destructuring [rows, fieldData] data from retrieved data from database
		res.render("shop/index", {
			prods: rows, // rows are products
			pageTitle: "Shop",
			path: "/",
		}); // render template
	}).catch(err => console.log(err));
	
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
	Cart.getCart(cart => {
		Product.fetchAll(products => {
			const cartProducts = []
			for (const product of products) {
				const cartItem = cart.products.find(item => item.id === product.id)
				if (cartItem) {
					cartProducts.push({productData: product, qty: cartItem.qty})
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
