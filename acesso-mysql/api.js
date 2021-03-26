const db = require('./db')
const categories = require('./categories')(db)
const products = require('./products')(db)

const test = async () => {
  try {
    // await categories.create(['new category from api'])
    // await categories.update(6, ['update category from api'])
    // await categories.remove(6)
    // const cats = await categories.findAll()
    // console.log(cats)
    
  } catch (err) {
    console.log(err)
  }
}
test()