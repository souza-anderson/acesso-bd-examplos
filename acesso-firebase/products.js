const db = require('./firestore')
const admin = require('firebase-admin')

const findAll = async () => {
  const productsDB = await db.collection('products').get()
  if (productsDB.empty) {
    return []
  }
  
  const products = []
  
  productsDB.forEach(res => {
    products.push({
      ...res.data(),
      id: res.id
    })
  })
  const products2 = []
  for await (product of products) {
    const imgs = []
    const imgsDB = await db
      .collection('products')
      .doc(product.id)
      .collection('images')
      .get()

    imgsDB.forEach(img => {
      imgs.push({
        id: img.id,
        ...img
      })
    })

    products2.push({
      ...product,
      imgs
    })

  }
  return products2
}


const findAllPaginated = async ({ pageSize = 10, startAfter = '' }) => {

  const productsDB = await db
    .collection('products')
    .orderBy('product')
    .limit(pageSize + 1)
    .startAfter(startAfter)
    .get()
  
  const products = []
  let total = 0
  productsDB.forEach(res => {
    if (total < pageSize) {
      products.push({
        ...res.data(),
        id: res.id
      })
    }
    total++
  })

  const products2 = []
  for await (product of products) {
    const imgs = []
    const imgsDB = await db
      .collection('products')
      .doc(product.id)
      .collection('images')
      .get()

    imgsDB.forEach(img => {
      imgs.push({
        id: img.id,
        ...img
      })
    })

    products2.push({
      ...product,
      imgs
    })

  }    
  
  return {
    data: products2,
    total: products2.length,
    hasNext: total > pageSize,
    startAfter: total > pageSize ? products2[products2.length - 1].product : ''
  }
}

const addImage = async (id, data) => {
  const doc = 
    db
      .collection('products')
      .doc(id)
      .collection('images')
      .doc()

  await doc.set(data)      
}



const create = async ({ categories, ...data }) => {
  const doc = db.collection('products').doc()
  const categoriesRef = categories.map(cat => db.collection('categories').doc(cat))
  await doc.set({
    ...data,
    categories2: categories,
    categories: categoriesRef
  })
}

const update = async (id, { categories, ...data }) => {
  const doc = db.collection('products').doc(id)
  const categoriesRef = categories.map(cat => db.collection('categories').doc(cat))

  await doc.update({
      ...data,
      categories: admin.firestore.FieldValue.arrayUnion(...categoriesRef),
      categories2: admin.firestore.FieldValue.arrayUnion(...categories)
  })
}

const remove = async (id) => {
  const doc = db.collection('products').doc(id)
  const imgs = await doc.collection('images').get()

  const exclusoes = []
  imgs.forEach(img => {      
    return exclusoes.push(img.ref.delete())
  })
  await Promise.all(exclusoes)  
  await doc.delete()  
}

module.exports = {
  findAll,
  findAllPaginated,
  create,
  update,
  remove,
  addImage
}