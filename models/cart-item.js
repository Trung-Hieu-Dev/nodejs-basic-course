/* using Sequelize library */

// connecting to database
const { Sequelize } = require('sequelize')
const sequelize = require('../utils/database')

// define Model (item in table of database)
const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: Sequelize.INTEGER
})

module.exports = CartItem