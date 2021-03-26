const admin = require('firebase-admin');

const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const categories = db.collection('categories').get()

categories.then(snapshot => {
    snapshot.forEach(res => {
        console.log('id =>', res.id, res.data())
    })
})