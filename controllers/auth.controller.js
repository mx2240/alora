
const { admin, db } = require("../config/firebase");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "alora_secret_key";
const axios = require("axios");

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await db.ref("users").once("value");

    let foundUser = null;

    user.forEach(child => {
        if (child.val().email === email) {
            foundUser = { uid: child.key, ...child.val() };
        }
    });

    if (!foundUser) {
        return res.status(401).json({ error: "User not found" });
    }

    const token = jwt.sign(
        {
            uid: foundUser.uid,
            email: foundUser.email
        },
        SECRET,
        { expiresIn: "7d" }
    );

    res.json({ token });
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