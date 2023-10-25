// data
const Order = require("../models/order");
const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
	Product
		.find()
		.then(products => {
			res.render("shop/product-list", {
				prods: products,
				pageTitle: "All Products",
				path: "/products",
			}); // render template
		})
		.catch()
};

exports.getProducts = (req, res, next) => {
	Product
		.find()
		.then(products => {
			res.render("shop/product-list", {
				prods: products,
				pageTitle: "All Products",
				path: "/products",
			});
		})
		.catch()
};

exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;

	Product.findById(prodId)
		.then((product) => {
			res.render("shop/product-detail", {
				product: product,
				pageTitle: product.title,
				path: `/products`,
			});
		})
		.catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
	req.user
		.populate('cart.items.productId') // get more data from product
		.then(user => {
			const products = user.cart.items
			res.render("shop/cart", {
				path: "/cart",
				pageTitle: "Cart",
				products: products
			});
		})
		.catch(err => console.log(err))

};

exports.getPostCart = (req, res, next) => {
	const proId = req.body.productId;
	Product.findById(proId)
		.then(product => {
			req.user.addToCart(product);
			res.redirect('/cart')
		})
		.catch(err => console.log(err))
};

exports.getDeleteCart = (req, res, next) => {
	const proId = req.body.productId;
	req.user.deleteItemFromCart(proId)
		.then(() => {
			res.redirect("/cart")
		})
		.catch(err => console.log(err))

};

exports.getPostOrder = (req, res, next) => {
	req.user
		.populate('cart.items.productId') // get more data from product
		.then(user => {
			const products = user.cart.items.map(i => {
				return { quantity: i.quantity, product: { ...i.productId._doc } }
			})

			const order = new Order({
				products: products,
				user: {
					name: req.user.name,
					userId: req.user,
				}
			})

			return order.save()
		})
		.then(() => {
			return req.user.clearCart();
		})
		.then(() => {
			res.redirect('/orders');
		})
		.catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
	req.user.getOrders()
		.then(orders => {
			res.render("shop/orders", {
				path: "/orders",
				pageTitle: "Orders",
				orders: orders
			});
		})
		.catch(err => console.log(err))


};

// exports.getCheckout = (req, res, next) => {
// 	res.render("shop/checkout", {
// 		path: "/checkout",
// 		pageTitle: "Checkout",
// 	});
// };
