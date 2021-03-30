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
    // await products.addImage(6, ['new image', 'url image'])
    // const prods = await products.findAllByCategory(3)
    // const prods = await products.findAllPaginated({ currentPage: 0, pageSize: 2})
    // console.log(prods)
    // await products.updateCategories(5, [3,4,5])
    // for (let i = 0; i < 1000; i++) {
    //   products.findAllPaginated().then(prods => console.log(prods))
    // }


  } catch (err) {
    console.log(err)
  }
}
test()