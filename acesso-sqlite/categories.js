const db = require('./db')


const init = database => {
  const create = async (data) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, `INSERT INTO categories (id, category) VALUES (?,?);`, data)
  }

  const findAll = async () => {
    const dbConn = await db.init(database)
    const records = await db.query(dbConn, 'SELECT * FROM categories;')
    return records
  }

  const findAllPaginated = async ({ pageSize = 1, currentPage = 0 }) => {
    

    const dbConn = await db.init(database)
    const records = await db.query(dbConn, `SELECT * FROM categories limit ${currentPage*pageSize}, ${pageSize + 1};`)
    
    const hasNext = records.length > pageSize
    if (hasNext) {
      records.pop()
    }

    return {
      records,
      hasNext
    }
  }

  const update = async (id, data) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, `UPDATE categories SET category=? WHERE id=?;`, [...data, id])
  }

  const remove = async (id) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, 'DELETE FROM categories WHERE id=?', [id])
  }

  return {
    findAll,
    findAllPaginated,
    remove,
    create,
    update
  }
}
module.exports = init