const init = connection => {  
  const create = async(data) => {    
    const conn = await connection
    await conn.query(`insert into categories (category) values (?)`, data)
  }
  const update = async(id, data) => {    
    const conn = await connection
    await conn.query(`update categories set category = ? where id = ?`, [...data, id])
  }
  const remove = async (id) => {
    const conn = await connection
    await conn.query(`delete from categories where id = ? limit 1`, [id])
  }
  const findAll = async () => {
    const conn = await connection
    const [ result ] = await conn.query(`select * from categories`)
    return result
  }

  return {
    create,
    update,
    remove,
    findAll
  }
}
module.exports = init