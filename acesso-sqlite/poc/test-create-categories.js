const sqlite = require('sqlite3').verbose()

const initDB = databaseFile => new Promise ((resolve, reject) => {
  const db = new sqlite.Database(databaseFile, err => err ? reject(err) : resolve(db))
})

const run = (db, query, values) => new Promise ((resolve, reject) => {
db.run(query, values, err => err ? reject(err) : resolve())
})

const createCategories = async () => {
  const db = await initDB('banco.sqlite3')
  // await run(db, `INSERT INTO categories (id, category) VALUES (?,?);`, [3, 'Smartphones'])
  await run(db, `INSERT INTO categories (id, category) VALUES (?,?);`, [2, 'Eletronicos'])
  await run(db, `INSERT INTO categories (id, category) VALUES (?,?);`, [4, 'Notebooks/Laptops'])
  console.log('Categoria criada')
}
createCategories().catch(err => console.log(err))