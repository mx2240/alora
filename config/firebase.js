// // const admin = require("firebase-admin");
// // const path = require("path");

// // const serviceAccount = require(path.resolve(__dirname, "../serviceAccountKey.json"));

// // admin.initializeApp({
// //     credential: admin.credential.cert(serviceAccount),
// //     databaseURL: process.env.FIREBASE_DB_URL
// // });

// // const db = admin.database();
// // const auth = admin.auth();

// // module.exports = { admin, db, auth };




// const admin = require("firebase-admin");
// const path = require("path");

// const serviceAccount = require(path.resolve("./serviceAccountKey.json"));

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.FIREBASE_DB_URL
// });

// const db = admin.database();
// const auth = admin.auth();

// module.exports = { admin, db, auth };




const admin = require("firebase-admin");

// 1. Safe relative import for Vercel's bundler (do not use path.resolve)
const serviceAccount = require("../serviceAccountKey.json");

// 2. CRITICAL FIX: Only initialize if Firebase isn't already running
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DB_URL
    });
}

// 3. Keep your existing database and auth exports intact
const db = admin.database();
const auth = admin.auth();

module.exports = { admin, db, auth };
