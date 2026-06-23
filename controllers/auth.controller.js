
// const bcrypt = require("bcryptjs");
// const authService = require("../services/auth.service");
// const users = [];


// exports.register = async (req, res) => {
//     const { name, email, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = {
//         id: Date.now(),
//         name,
//         email,
//         password: hashedPassword
//     };

//     users.push(user);

//     res.json({
//         message: "User registered",
//         user
//     });
// };



// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     const user = users.find(u => u.email === email);

//     if (!user) {
//         return res.status(401).json({ error: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//         return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//         { id: user.id, email: user.email },
//         SECRET,
//         { expiresIn: "7d" }
//     );

//     res.json({
//         message: "Login successful",
//         token
//     });
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




// const { admin, db } = require("../config/firebase");

// // register = create user profile in DB only
// exports.register = async (req, res) => {
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









const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../config/firebase");
const { admin } = require("../config/firebase");

const SECRET = process.env.JWT_SECRET || "alora_secret_key";

/**
 * REGISTER USER (PRODUCTION)
 */
// exports.register = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         if (!name || !email || !password) {
//             return res.status(400).json({ error: "Missing fields" });
//         }

//         const snapshot = await db.ref("users").orderByChild("email").equalTo(email).once("value");

//         if (snapshot.exists()) {
//             return res.status(400).json({ error: "User already exists" });
//         }

//         const userId = Date.now().toString();
//         const passwordHash = await bcrypt.hash(password, 10);

//         const user = {
//             userId,
//             name,
//             email,
//             password: passwordHash,
//             createdAt: Date.now()
//         };

//         await db.ref(`users/${userId}`).set(user);

//         res.json({
//             message: "User registered",
//             userId
//         });

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };



exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const user = await admin.auth().createUser({
            email,
            password,
            displayName: name
        });

        res.json({
            message: "User created",
            uid: user.uid
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * LOGIN USER
 */
// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const snapshot = await db.ref("users").orderByChild("email").equalTo(email).once("value");

//         if (!snapshot.exists()) {
//             return res.status(401).json({ error: "User not found" });
//         }

//         let user = null;

//         snapshot.forEach(child => {
//             user = child.val();
//         });

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(401).json({ error: "Invalid credentials" });
//         }

//         const token = jwt.sign(
//             {
//                 userId: user.userId,
//                 email: user.email
//             },
//             SECRET,
//             { expiresIn: "7d" }
//         );

//         res.json({
//             message: "Login successful",
//             token,
//             user: {
//                 userId: user.userId,
//                 name: user.name,
//                 email: user.email
//             }
//         });

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };


exports.login = async (req, res) => {
    try {
        const { uid, email } = req.body;

        const token = jwt.sign(
            { uid, email },
            SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token
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