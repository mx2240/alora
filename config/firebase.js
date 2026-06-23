



const admin = require("firebase-admin");

if (!admin.apps.length) {
    const serviceAccount = require("../serviceAccountKey.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DB_URL
    });
}

const db = admin.database();
const auth = admin.auth();

module.exports = { admin, db, auth };