const sqlite = require('sqlite3').verbose()

const initDB = databaseFile => new Promise ((resolve, reject) => {
  const db = new sqlite.Database(databaseFile, err => err ? reject(err) : resolve(db))
})

const run = (db, query, values) => new Promise ((resolve, reject) => {
db.run(query, values, err => err ? reject(err) : resolve())
})

const updateCategories = async () => {
  const db = await initDB('banco.sqlite3')
  await run(db, `UPDATE categories SET category=? WHERE id=?;`, ['Celulares em geral', 2])
  // await run(db, `INSERT INTO categories (id, category) VALUES (?,?);`, [1, 'Eletronicos'])
  console.log('Categoria atualizada')
}
updateCategories().catch(err => console.log(err))