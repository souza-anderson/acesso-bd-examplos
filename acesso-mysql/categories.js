const init = connection => {  
  const create = async(data) => {    
    const conn = await connection
    await conn.query(`insert into categories (category) values (?)`, data)
  }

  return {
    create
  }
}
module.exports = init