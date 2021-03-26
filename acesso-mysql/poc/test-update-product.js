const mysql = require('mysql2/promise')

const run = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'cat-products'
    })

    try {
      const [ results ] = await connection.query(`update products set product=?, price=? where id=?`, ['new product 3', 199, 3])
      console.log(results)
    } catch(err) {
      console.log(err)
    }
  } catch (err) {
    console.log(err)
  }
}
run()
