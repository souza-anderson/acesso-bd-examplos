const init = connection => {  
  const create = async(data) => {    
    const conn = await connection
    await conn.query(`insert into products (product, price) values (?, ?)`, data)
  }
  const addImage = async (productId, data) => {
    const conn = await connection
    await conn.query(`insert into images (description, url, product_id) values (?, ?, ?)`, [...data, productId])    
  }
  const update = async(id, data) => {    
    const conn = await connection
    await conn.query(`update products set product = ?, price = ? where id = ?`, [...data, id])
  }
  const remove = async (id) => {
    const conn = await connection
    await conn.query(`delete from products where id = ? limit 1`, [id])
  }
  const findAll = async () => {
    const conn = await connection
    const [ result ] = await conn.query(`select * from products`)
    const images = await conn.query(`select * from images group by product_id`)
    const mapImages = images.reduce((antigo, atual) => {
      return {
        ...antigo,
        [atual.product_id]: atual
      }
    })
    const resultWithImages = result.map(product => {
      return {
        ...product,
        images: mapImages[product.id]
      }
    })
    return resultWithImages
  }

  return {
    create,
    update,
    remove,
    findAll,
    addImage
  }
}
module.exports = init