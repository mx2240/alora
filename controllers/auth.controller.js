

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { db } = require("../config/firebase");
// const { admin } = require("../config/firebase");

// const SECRET = process.env.JWT_SECRET || "alora_secret_key";

// /**
//  * REGISTER USER (PRODUCTION)
//  */

// exports.register = async (req, res) => {
//     try {
//         const { email, password, name } = req.body;

//         const user = await admin.auth().createUser({
//             email,
//             password,
//             displayName: name
//         });

//         await db.ref(`users/${user.uid}`).set({
//             name,
//             email,
//             createdAt: Date.now()
//         });

//         return res.json({
//             message: "User created",
//             uid: user.uid
//         });

//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// };


// exports.login = async (req, res) => {
//     try {
//         const { idToken } = req.body;

//         const decoded = await admin.auth().verifyIdToken(idToken);

//         const token = jwt.sign(
//             {
//                 uid: decoded.uid,
//                 email: decoded.email
//             },
//             SECRET,
//             { expiresIn: "7d" }
//         );

//         return res.json({
//             message: "Login successful",
//             token
//         });

//     } catch (err) {
//         return res.status(401).json({
//             error: "Invalid Firebase token",
//             message: err.message
//         });
//     }
// };




// exports.createUserProfile = async (req, res) => {
//     try {
//         const { uid, name, email } = req.body;

//         await db.ref(`users/${uid}`).set({
//             name,
//             email,
//             createdAt: Date.now()
//         });

//         res.json({ message: "User profile created" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

const { admin, db } = require("../config/firebase");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "alora_secret_key";
const axios = require("axios");

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const user = await admin.auth().createUser({
            email,
            password,
            displayName: name
        });

        await db.ref(`users/${user.uid}`).set({
            name,
            email,
            createdAt: Date.now()
        });

        res.json({
            message: "User created",
            uid: user.uid
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// exports.login = async (req, res) => {
//     try {
//         const { idToken } = req.body;

//         const decoded = await admin.auth().verifyIdToken(idToken);

//         const token = jwt.sign(
//             {
//                 uid: decoded.uid,
//                 email: decoded.email
//             },
//             SECRET,
//             { expiresIn: "7d" }
//         );

//         res.json({
//             message: "Login successful",
//             token
//         });

//     } catch (err) {
//         res.status(401).json({
//             error: "Invalid Firebase token",
//             message: err.message
//         });
//     }
// };



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // 1. Authenticate user credentials against the Firebase Client Authentication REST API
        const firebaseResponse = await axios.post(
            `https://googleapis.com{process.env.FIREBASE_WEB_API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true
            }
        );

        // 2. Extract the actual verified ID Token string
        const { localId, email: userEmail } = firebaseResponse.data;

        // 3. Securely sign your custom Express backend JWT application token
        const token = jwt.sign(
            {
                uid: localId,
                email: userEmail
            },
            SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            message: "Login successful",
            token
        });

    } catch (err) {
        // Capture specific Firebase validation errors (like "EMAIL_NOT_FOUND" or "INVALID_PASSWORD")
        const errorMessage = err.response?.data?.error?.message || err.message;
        return res.status(401).json({
            error: "Authentication failed",
            message: errorMessage
        });
    }
};




exports.createUserProfile = async (req, res) => {
    try {
        const { uid, name, email } = req.body;

        await db.ref(`users/${uid}`).set({
            name,
            email,
            createdAt: Date.now()
        });

        res.json({ message: "User profile created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};