const admin = require('firebase-admin');

const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const doc = db.collection('categories').doc()

doc.set({
    category: 'Categoria criada via codigo'
}).then(snap => {
    console.log(snap)
})