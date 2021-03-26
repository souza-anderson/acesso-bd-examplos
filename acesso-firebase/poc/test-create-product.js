const admin = require('firebase-admin');

const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const doc = db.collection('products').doc()
const cat1 = 'cGqH8yLbKK7tyoY4sbCr'
const catRef = db.collection('categories').doc(cat1)

doc.set({
    product: 'Smart TV LG 65',
    price: 4999,
    categories: [catRef]
}).then(snap => {
    console.log(snap)
})