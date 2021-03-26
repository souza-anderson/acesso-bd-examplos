const sqlite = require('sqlite3').verbose()

const initDB = databaseFile => new Promise ((resolve, reject) => {
  const db = new sqlite.Database(databaseFile, err => err ? reject(err) : resolve(db))
  
})

const run = (db, query, values) => new Promise ((resolve, reject) => {
db.all(query, values, (err, rows) => err ? reject(err) : resolve(rows))
})

const listProducts = async () => {
  const db = await initDB('banco.sqlite3')
  const products = await run(db, `SELECT * FROM products WHERE id in (SELECT product_id FROM categories_products WHERE category_id=?);`, [4])
  console.log(products)
  
}
listProducts().catch(err => console.log(err))