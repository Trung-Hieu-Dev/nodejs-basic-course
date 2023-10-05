/* using Sequelize library */

// connecting to database
const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

// define Model (table in database)
const Product = sequelize.define('product', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: Sequelize.STRING,
	price: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	imageUrl: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false
	}
})

module.exports = Product





// configure database
/* using mysql2
const db = require('../utils/database')
const Cart = require("./cart");



module.exports = class Product {
	constructor(id, title, imageUrl, price, description) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.price = price;
		this.description = description;
	}

	save() {
		// inserting data into database
		return db.execute(
			'INSERT INTO products (title, price, description, imageUrl) VALUES (?,?,?,?)',
			[this.title, this.price, this.description, this.imageUrl]
		)
	}

	static fetchAll() {
		return db.execute('SELECT * FROM products') // retrieving data from database
	}

	static findById(id) {
		return db.execute('SELECT * FROM products WHERE products.id=?', [id])
	}

	static deleteById(id) {
		return db.execute('DELETE FROM products WHERE products.id=?', [id])
	}
};

*/
