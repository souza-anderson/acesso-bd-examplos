const categories = require('./categories');
const products = require('./products')

const testes = async () => {
  // await categories.remove('h4lK3gy3hQ93o7nVGJhW')
  // await categories.create({ category: 'Nova categoria criada' }
  // const res = await categories.findAllPaginated({pageSize: 3})
  // console.log(res)
  // await products.create({
  //   product: 'new product', 
  //   price: 997, 
  //   categories: ['76VPHOvoXoyRU78qBgXP'] 
  // })
  // await products.update('M7acb3Iim7Lv0HIUYK7x', {
  //   product: 'product updated',
  //   price: 1497,
  //   categories: ['cGqH8yLbKK7tyoY4sbCr', 'c4MPabb3yjLMA1pQycM2']
  // })

  // await products.remove('uoEbCTdPgzpUt4hLWyW3')
  const test = await products.findAllPaginated({ pageSize: 1})
  console.log(test)
  // await products.addImage('23WPXI8M94DbY7vOdEbB', { description: 'image 1', url: 'url1'})
  // await products.addImage('23WPXI8M94DbY7vOdEbB', { description: 'image 2', url: 'url2'})
  // await products.addImage('23WPXI8M94DbY7vOdEbB', { description: 'image 3', url: 'url3'})
  // await products.addImage('6kRJzzoCpGAWtLOavHKn', { description: 'image 1', url: 'url1'})
  // await products.addImage('TJh6wZmbfZkPa0QmODtC', { description: 'image 1', url: 'url1'})
  // await products.addImage('do7pY0a5ypLDOCp2fPZR', { description: 'image 1', url: 'url1'})
 
}

testes()


