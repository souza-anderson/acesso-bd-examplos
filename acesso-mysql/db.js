const msyql = require('mysql2/promise')

module.exports = msyql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'cat-products'
})