// data
const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
	Product
		.fetchAll()
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
		.fetchAll()
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

	Product.findById(prodId).then((product) => {
		res.render("shop/product-detail", {
			product: product,
			pageTitle: product.title,
			path: `/products`,
		});
	}).catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
	req.user
		.getCart()
		.then(products => {
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

};

exports.getPostOrder = (req, res, next) => {
	let fetchedCart;
	req.user.getCart()
		.then(cart => {
			fetchedCart = cart
			return cart.getProducts()
		})
		.then(products => {
			return req.user.createOrder()
				.then(order => {
					return order.addProducts(products.map(product => {
						product.orderItem = { quantity: product.cartItem.quantity }
						return product
					}))
				})
				.catch(err => console.log(err))
		})
		.then(result => {
			return fetchedCart.setProducts(null)
		})
		.then(result => {
			res.redirect("/orders")
		})
		.catch(err => err)
}

exports.getOrders = (req, res, next) => {
	req.user.getOrders({ include: ['products'] })
		.then(orders => {
			console.log(orders);
			res.render("shop/orders", {
				path: "/orders",
				pageTitle: "Orders",
				orders: orders
			});
		})
		.catch(err => console.log(err))


};

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		path: "/checkout",
		pageTitle: "Checkout",
	});
};
