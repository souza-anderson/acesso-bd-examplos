const categories = require('./categories')('banco.sqlite3')
const products = require('./products')('banco.sqlite3')

const test = async () => {
  // await categories.create([5, 'categoria 5'])
  // await categories.create([7, 'categoria 7'])
  // await categories.update(5, ['categoria 5 atualizada de novo'])
  // await categories.remove(5)
  // const result = await categories.findAll()
  // console.log(result)
  // console.log('cp: 0', await categories.findAllPaginated({ pageSize: 2, currentPage: 0 }))
  // console.log('cp: 1', await categories.findAllPaginated({ pageSize: 2, currentPage: 1 }))
  // console.log('cp: 2', await categories.findAllPaginated({ pageSize: 2, currentPage: 2 }))
  // console.log('cp: 3', await categories.findAllPaginated({ pageSize: 2, currentPage: 3 }))

  // await products.create([6, 'novo produto', 699])
  // await products.update(6, ['produto atualizado', 599])
  // await products.addImage(2, [3, 'descricao image 3', 'url image 3'])
  // console.log(await products.findAllPaginated({ pageSize: 3, currentPage: 0 }))
  // await products.updateCategories(3, [3,4,5])
  await products.findAllByCategory(3)
}

test()