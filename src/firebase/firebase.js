const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://hobit-e64f0-default-rtdb.firebaseio.com"
});

const db = getFirestore();

module.exports = {
  db
}