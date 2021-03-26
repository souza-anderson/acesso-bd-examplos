const admin = require('firebase-admin');

const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const doc = db.collection('products').doc('MWarg8Ox3QF0Su6JkjVp')
const cat1 = '50pmpFLTtL03XgzxV5sV'
const catRef = db.collection('categories').doc(cat1)

doc.update({
    product: 'Smart TV LG 65 polegadas (muito grande grande grade)',
    price: 4999,
    categories: admin.firestore.FieldValue.arrayUnion(catRef),
    categories2: admin.firestore.FieldValue.arrayUnion(cat1)
}).then(snap => {
    console.log(snap)
})