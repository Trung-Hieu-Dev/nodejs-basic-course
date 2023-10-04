const mysql = require('mysql2')

// configure database connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_complete'
})

module.exports = pool.promise()