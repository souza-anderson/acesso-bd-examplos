const mysql = require('mysql2/promise')

const run = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'cat-products'
    })

    try {
      const [ results ] = await connection.query(`update categories set category=? where id=?`, ['new category 3', 3])
      console.log(results)
    } catch(err) {
      console.log(err)
    }
  } catch (err) {
    console.log(err)
  }
}
run()
