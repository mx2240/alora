

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../config/firebase");
const { admin } = require("../config/firebase");

const SECRET = process.env.JWT_SECRET || "alora_secret_key";

/**
 * REGISTER USER (PRODUCTION)
 */

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

        return res.json({
            message: "User created",
            uid: user.uid
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { idToken } = req.body;

        const decoded = await admin.auth().verifyIdToken(idToken);

        const token = jwt.sign(
            {
                uid: decoded.uid,
                email: decoded.email
            },
            SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            message: "Login successful",
            token
        });

    } catch (err) {
        return res.status(401).json({
            error: "Invalid Firebase token",
            message: err.message
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