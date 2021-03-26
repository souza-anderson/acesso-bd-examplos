const sqlite = require('sqlite3').verbose()

const initDB = databaseFile => new Promise ((resolve, reject) => {
  const db = new sqlite.Database(databaseFile, err => err ? reject(err) : resolve(db))
})

const run = (db, query, values) => new Promise ((resolve, reject) => {
db.run(query, values, err => err ? reject(err) : resolve())
})

const updateProducts = async () => {
  const db = await initDB('banco.sqlite3')
  await run(db, `UPDATE products SET product=?, price=? WHERE id=?;`, ['produto atualizado 1', 1999, 1])
  console.log('Produto atualizado')
}
updateProducts().catch(err => console.log(err))