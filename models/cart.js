/* using Sequelize library */

// connecting to database
const { Sequelize } = require('sequelize')
const sequelize = require('../utils/database')

// define Model (item in table of database)
const Cart = sequelize.define('cart', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	}
})

module.exports = Cart


/*
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
	static addProduct(id, productPrice) {
		// Fetch the previous cart
		fs.readFile(p, (err, fileContent) => {
			let cart = { products: [], totalPrice: 0 };
			if (!err) {
				cart = JSON.parse(fileContent);
			}
			// Analyze the cart => find the existing product
			const existingProduct = cart.products.find(
				(prod) => prod.id === id
			);
			// Add new product / increase quantity
			let updatedProduct;
			if (existingProduct) {
				existingProduct.qty += 1;
			} else {
				updatedProduct = { id: id, qty: 1 };
				cart.products = [...cart.products, updatedProduct];
			}
			cart.totalPrice = cart.totalPrice + +productPrice;
			// file created to store cart information
			fs.writeFile(p, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		});
	}

	static deleteById(id, productPrice) {
		fs.readFile(p, (err, fileContent) => {
			if (err) {
				return;
			}
			const updatedCart = { ...JSON.parse(fileContent) };

			const product = updatedCart.products.find((prod) => prod.id === id);

			if (!product) {
				return
			}

			updatedCart.products = updatedCart.products.filter(
				(product) => product.id !== id
			);

			updatedCart.totalPrice =
				updatedCart.totalPrice - product.qty * productPrice;

			fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
				console.log(err);
			});
		});
	}

	static getCart(cb) {
		fs.readFile(p, (err, fileContent) => {
			const cart = JSON.parse(fileContent)
			if (err) {
				return cb(null);
			} else {
				cb(cart)
			}
		});
	}
};
*/