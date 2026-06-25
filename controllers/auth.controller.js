
const { admin, db } = require("../config/firebase");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "alora_secret_key";
const axios = require("axios");

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Search by index if possible, or filter
    const snapshot = await db.ref("users").orderByChild("email").equalTo(email).once("value");

    if (!snapshot.exists()) {
        return res.status(401).json({ error: "User not found" });
    }

    const userData = snapshot.val();
    const uid = Object.keys(userData)[0];
    const user = userData[uid];

    // CRITICAL: Check password (add hashing like bcrypt later)
    if (user.password !== password) {
        return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
        { uid: uid, email: user.email },
        SECRET,
        { expiresIn: "7d" }
    );

    res.json({ token, user: { name: user.name, email: user.email } });
};



exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const userRef = await db.ref("users").push({
            email,
            password, // (you should hash later)
            name,
            createdAt: Date.now()
        });

        res.json({
            message: "User registered",
            uid: userRef.key
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
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


exports.getProfile = async (req, res) => {
    try {
        // req.user comes from your JWT middleware
        const uid = req.user.uid;
        const snapshot = await db.ref(`users/${uid}`).once("value");

        if (!snapshot.exists()) {
            return res.status(404).json({ error: "User profile not found" });
        }

        res.json({
            success: true,
            user: snapshot.val()
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};