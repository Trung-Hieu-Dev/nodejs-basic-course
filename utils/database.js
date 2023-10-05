/*
const mysql = require('mysql2')

// configure database connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_complete'
})

module.exports = pool.promise()
*/

// Option 2: Using Sequelize (mysql2 must be installed together with sequelize)
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('node_complete', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
}) // arguments: (database, user, password, option)

module.exports = sequelize