// const admin = require("firebase-admin");
// const path = require("path");

// const serviceAccount = require(path.resolve(__dirname, "../serviceAccountKey.json"));

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.FIREBASE_DB_URL
// });

// const db = admin.database();
// const auth = admin.auth();

// module.exports = { admin, db, auth };




const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.resolve("./serviceAccountKey.json"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL
});

const db = admin.database();
const auth = admin.auth();

module.exports = { admin, db, auth };