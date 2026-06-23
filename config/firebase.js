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




// const admin = require("firebase-admin");

// // 1. Safe relative import for Vercel's bundler (do not use path.resolve)
// const serviceAccount = require("../serviceAccountKey.json");

// // 2. CRITICAL FIX: Only initialize if Firebase isn't already running
// if (!admin.apps.length) {
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//         databaseURL: process.env.FIREBASE_DB_URL
//     });
// }

// // 3. Keep your existing database and auth exports intact
// const db = admin.database();
// const auth = admin.auth();

// module.exports = { admin, db, auth };



// const admin = require("firebase-admin");
// const dbUrl = process.env.FIREBASE_DB_URL;

// let app;

// if (!dbUrl) {
//     throw new Error("FIREBASE_DB_URL is missing");
// }

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: dbUrl
// });

// // CRITICAL FIX: Explicitly extract or generate the primary instance
// if (admin.apps.length > 0) {
//     app = admin.app(); // Safely retrieve the already initialized instance
// } else {
//     // Relative path lookup from the /config folder into the root directory
//     const serviceAccount = require("../serviceAccountKey.json");

//     console.log("FIREBASE_DB_URL =", process.env.FIREBASE_DB_URL);

//     app = admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//         databaseURL: process.env.FIREBASE_DB_URL
//     });
// }

// // Extract database and auth metrics bound specifically to the active app instance
// const db = app.database();
// const auth = app.auth();

// module.exports = {
//     admin,
//     db,
//     auth
// };



const admin = require("firebase-admin");

let firebaseApp;

if (admin.apps.length) {
    firebaseApp = admin.app();
} else {
    const serviceAccount = require("../serviceAccountKey.json");

    firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DB_URL
    });
}

const db = firebaseApp.database();
const auth = firebaseApp.auth();

module.exports = {
    admin,
    db,
    auth
};



