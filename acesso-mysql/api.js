const db = require('mysql2/promise')
const categories = require('./categories')(db)

const test = async () => {
  try {
    await categories.create(['new category from api'])
    
  } catch (err) {
    console.log(err)
  }
}
test()