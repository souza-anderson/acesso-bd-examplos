const admin = require('firebase-admin');

const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const productId = 'MWarg8Ox3QF0Su6JkjVp'
const products= db.collection('products').doc(productId)

products
  .collection('images')
  .get()
  .then(imgSnap => {
    const exclusoes = []
    imgSnap.forEach(img => {      
      return exclusoes.push(img.ref.delete())
    })
    Promise.all(exclusoes)
  })
  .then(() => {
    products.delete()
  })
  .then(() => {
    console.log('Deleted all products')
  })