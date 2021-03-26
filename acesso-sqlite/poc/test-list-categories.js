const sqlite = require('sqlite3').verbose()

const initDB = databaseFile => new Promise ((resolve, reject) => {
  const db = new sqlite.Database(databaseFile, err => err ? reject(err) : resolve(db))
  
})

const run = (db, query) => new Promise ((resolve, reject) => {
db.all(query, (err, rows) => err ? reject(err) : resolve(rows))
})

const listCategories = async () => {
  const db = await initDB('banco.sqlite3')
  const rows = await run(db, `SELECT * FROM categories;`)
  console.log(rows)
  
}
listCategories().catch(err => console.log(err))