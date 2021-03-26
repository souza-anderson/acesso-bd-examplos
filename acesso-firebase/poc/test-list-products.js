const admin = require('firebase-admin');

const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const produtcs = db.collection('products').get()

produtcs.then(snapshot => {
  snapshot.forEach(doc => {
    
    db.collection('products').doc(doc.id).collection('images').get()
      .then(snap => {
        snap.forEach(imgSnap => {
          console.log('image', imgSnap.data())
        })
      })
  })
})