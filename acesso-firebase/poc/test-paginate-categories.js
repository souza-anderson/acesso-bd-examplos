const admin = require('firebase-admin');

const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const pageSize = 2

const categories = db
  .collection('categories')
  .orderBy('category')
  .limit(pageSize + 1)
  .get()

categories.then(snapshot => {
  let total = 0
  snapshot.forEach(snap => {
    if (total < pageSize) {
      console.log('id => ', snap.id, ' => ', snap.data())
    }
    total++;
  })
  if (total > pageSize) {
    console.log('hasNext', 'pageSize', pageSize, 'total', total)
  } else {
    console.log('does have next', 'pageSize', pageSize, 'total', total)
  }
})