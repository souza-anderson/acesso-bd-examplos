const sqlite = require('sqlite3').verbose()

const initDB = databaseFile => new Promise ((resolve, reject) => {
  const db = new sqlite.Database(databaseFile, err => err ? reject(err) : resolve(db))
})

const run = (db, query, values) => new Promise ((resolve, reject) => {
db.run(query, values, err => err ? reject(err) : resolve())
})

const removeCategories = async () => {
  const db = await initDB('banco.sqlite3')
  await run(db, `DELETE FROM categories WHERE id=?;`, [2])
  // await run(db, `INSERT INTO categories (id, category) VALUES (?,?);`, [1, 'Eletronicos'])
  console.log('Categoria deletada')
}
removeCategories().catch(err => console.log(err))