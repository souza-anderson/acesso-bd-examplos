const admin = require('firebase-admin');

const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const productId = 'MWarg8Ox3QF0Su6JkjVp'

const imageRef = db.collection('products').doc(productId).collection('images').doc()

imageRef.set({
    description: 'my image description',
    url: 'my image url'
}).then(res => {
    console.log(res)
})
