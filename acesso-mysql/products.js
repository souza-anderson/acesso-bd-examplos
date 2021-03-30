const init = connection => {
  const create = async (data) => {
    const conn = await connection
    await conn.query(`insert into products (product, price) values (?, ?)`, data)
  }
  const addImage = async (productId, data) => {
    const conn = await connection
    await conn.query(`insert into images (description, url, product_id) values (?, ?, ?)`, [...data, productId])
  }
  const update = async (id, data) => {
    const conn = await connection
    await conn.query(`update products set product = ?, price = ? where id = ?`, [...data, id])
  }
  const remove = async (id) => {
    const conn = await connection
    await conn.query(`delete from products where id = ? limit 1`, [id])
  }

  const findImages = async (results) => {
    const conn = await connection
    const productIds = results.map(product => product.id).join(',')

    const [images] = await conn.query('select * from images where product_id in (' + productIds + ') group by product_id')
    const mapImages = images.reduce((anterior, atual) => {
      return {
        ...anterior,
        [atual.product_id]: atual
      }
    }, {})

    const products = results.map(product => {
      return {
        ...product,
        image: mapImages[product.id]
      }
    })

    return products
  }

  const findAll = async () => {
    const conn = await connection
    const [results] = await conn.query('select * from products')
    return await findImages(results)
  }

  const findAllPaginated = async ({ pageSize = 10, currentPage = 0 } = {}) => {
    const conn = await connection
    const [ results ] = await conn.query(`SELECT * FROM products limit ${currentPage * pageSize}, ${pageSize + 1};`)
    const hasNext = results.length > pageSize
    if (hasNext) {
      results.pop()
    }

    const images = await findImages(results)
    const products = results.map(product => {
      return {
        ...product,
        image: images[product.id]
      }
    })

    return {
      products,
      hasNext
    }

  }

  const findAllByCategory = async (categoryId) => {
    const conn = await connection
    const [results] = await conn.query('select * from products where id in (select product_id from categories_products where category_id = ?)', [categoryId])
    return await findImages(results)
  }
  const updateCategories = async (productId, categories) => {
    const conn = await connection
    await conn.query('delete from categories_products where product_id = ?', [productId])
    for await (const category of categories) {
      await conn.query('insert into categories_products (product_id, category_id) values (?, ?)', [productId, category])
    }
  }

  return {
    create,
    update,
    updateCategories,
    remove,
    findAll,
    findAllPaginated,
    findAllByCategory,
    addImage
  }
}
module.exports = init