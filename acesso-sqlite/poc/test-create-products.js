const sqlite = require('sqlite3').verbose()

const initDB = databaseFile => new Promise ((resolve, reject) => {
  const db = new sqlite.Database(databaseFile, err => err ? reject(err) : resolve(db))
})

const run = (db, query, values) => new Promise ((resolve, reject) => {
db.run(query, values, err => err ? reject(err) : resolve())
})

const createProducts = async () => {
  const db = await initDB('banco.sqlite3')
  await run(db, `INSERT INTO products (id, product, price) VALUES (?,?,?);`, [2, 'novo produto 2', 5999])
  await run(db, `INSERT INTO products (id, product, price) VALUES (?,?,?);`, [3, 'novo produto 3', 1999])
  await run(db, `INSERT INTO products (id, product, price) VALUES (?,?,?);`, [4, 'novo produto 4', 599])
  await run(db, `INSERT INTO products (id, product, price) VALUES (?,?,?);`, [5, 'novo produto 5', 699])
  await run(db, `INSERT INTO categories_products (product_id, category_id) VALUES (?,?);`, [2,1])
  await run(db, `INSERT INTO categories_products (product_id, category_id) VALUES (?,?);`, [3,1])
  await run(db, `INSERT INTO categories_products (product_id, category_id) VALUES (?,?);`, [4,2])
  await run(db, `INSERT INTO categories_products (product_id, category_id) VALUES (?,?);`, [5,3])
  console.log('Produto criado')
}
createProducts().catch(err => console.log(err))