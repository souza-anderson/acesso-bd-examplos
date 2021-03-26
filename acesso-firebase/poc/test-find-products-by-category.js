const admin = require('firebase-admin');

const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const cat1 = 'cGqH8yLbKK7tyoY4sbCr'
const catRef = db.collection('categories').doc(cat1)

const products = db
  .collection('products')
  .where('categories', 'array-contains', catRef)
  .get()
  .then(snapshot => {
    snapshot.forEach(snap => {
      console.log('id => ', snap.id, snap.data())
    })
  })

