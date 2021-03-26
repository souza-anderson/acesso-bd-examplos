const db = require('./db')


const init = database => {
  const create = async (data) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, `INSERT INTO products (id, product, price) VALUES (?,?,?);`, data)
  }

  const addImage = async (productId, data) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, 'INSERT INTO images (id,description, url, product_id) VALUES (?,?,?,?);', [...data, productId])
  }

  const findAll = async () => {
    const dbConn = await db.init(database)
    // return await db.query(dbConn, 'select * from images where product_id in (1,2,3) group by product_id;')  
    const products = await db.query(dbConn, 'SELECT * FROM products;')
    const condition = products.map(product => product.id)
    const images = await db.query(dbConn, `select * from images where product_id in (${condition}) group by product_id`);
    const mapImages = images.reduce((antigo, atual) => {
      return {
        ...antigo,
        [atual.product_id]: atual
      }
    }, {})    
    
    return products.map(product => {
      return {
        ...product,
        image: mapImages[product.id]
      }
    })
  }

  const findAllByCategory = async (categoryId) => {
    const dbConn = await db.init(database)
    // return await db.query(dbConn, 'select * from images where product_id in (1,2,3) group by product_id;')  
    const products = await db.query(dbConn, `SELECT * FROM products WHERE id IN (SELECT product_id FROM categories_products WHERE category_id=${categoryId});`)
    const condition = products.map(product => product.id)
    const images = await db.query(dbConn, `select * from images where product_id in (${condition}) group by product_id`);
    const mapImages = images.reduce((antigo, atual) => {
      return {
        ...antigo,
        [atual.product_id]: atual
      }
    }, {})    
    
    return products.map(product => {
      return {
        ...product,
        image: mapImages[product.id]
      }
    })
  }

  const findAllPaginated = async ({ pageSize = 1, currentPage = 0 }) => {
    
    const dbConn = await db.init(database)
    const products = await db.query(dbConn, `SELECT * FROM products limit ${currentPage*pageSize}, ${pageSize + 1};`)
    const hasNext = products.length > pageSize
    if (hasNext) {
      products.pop()
    }
  
    const condition = products.map(product => product.id)
    const images = await db.query(dbConn, `select * from images where product_id in (${condition}) group by product_id`);
    const mapImages = images.reduce((antigo, atual) => {
      return {
        ...antigo,
        [atual.product_id]: atual
      }
    }, {})
    
    return {
      products: products.map(product => {
        return {
          ...product,
          image: mapImages[product.id]
        }
      }),
      hasNext
    }
  }

  const update = async (id, data) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, `UPDATE products SET product=?, price=? WHERE id=?;`, [...data, id])
  }

  const updateCategories = async (id, categories) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, 'DELETE FROM categories_products WHERE product_id=?', [id])
    for await (let category of categories) {
      await db.queryWithParams(dbConn, `INSERT INTO categories_products (product_id, category_id) VALUES (?,?)`, [id, category])
    }
  }

  const remove = async (id) => {
    const dbConn = await db.init(database)
    await db.queryWithParams(dbConn, 'DELETE FROM products WHERE id=?', [id])
    await db.queryWithParams(dbConn, 'DELETE FROM images WHERE product_id=?', [id])
    await db.queryWithParams(dbConn, 'DELETE FROM categories_product WHERE product_id=?', [id])
  }

  return {
    findAll,
    findAllByCategory,
    findAllPaginated,
    remove,
    create,
    update,
    updateCategories,
    addImage
  }
}
module.exports = init