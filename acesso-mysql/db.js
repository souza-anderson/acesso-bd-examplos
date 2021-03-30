const msyql = require('mysql2/promise')
// connection without pool
module.exports = msyql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'cat-products'
})

// conncetion with pool connection
// module.exports = msyql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'cat-products',
//   waitForConnections: true,
//   connectionLimit: 20,
//   queueLimit: 0
// })