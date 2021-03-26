const db = require('./firestore')


const getAll = async () => {
  const categoriesDB = await db.collection('categories').get()
  if (categoriesDB.empty) {
    return []
  }
  
  categories = []
  
  categoriesDB.forEach(res => {
    categories.push({
      ...res.data(),
      id: res.id
    })
  })
  console.log(categories)
}

const findAllPaginated = async ({ pageSize = 10, startAfter = '' }) => {

const categoriesDB = await db
  .collection('categories')
  .orderBy('category')
  .limit(pageSize + 1)
  .startAfter(startAfter)
  .get()

  categories = []
  let total = 0
  categoriesDB.forEach(res => {
    console.log(res.data())
    if (total < pageSize) {
      categories.push({
        ...res.data(),
        id: res.id
      })
    }
    total++
  })

  return {
    data: categories,
    total: categories.length,
    hasNext: total > pageSize,
    startAfter: total > pageSize ? categories[categories.length - 1].category : ''
  }
} 

const create = async (data) => {
  const doc = db.collection('categories').doc()
  await doc.set(data)
}

const update = async (id, data) => {
  const doc = db.collection('categories').doc(id)
  await doc.update(data)
}


const remove = async (id) => {
  const doc = db.collection('categories').doc(id);
  await doc.delete()
}

module.exports = {
  getAll,
  findAllPaginated,
  remove,
  create,
  update
}
