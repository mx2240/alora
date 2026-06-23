// const jwt = require("jsonwebtoken");

// const { admin } = require("../config/firebase");

// const SECRET = process.env.JWT_SECRET || "alora_secret_key";

// module.exports = (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;

//         if (!authHeader) {
//             return res.status(401).json({ error: "No token provided" });
//         }

//         // Expect: Bearer token
//         const parts = authHeader.split(" ");

//         if (parts.length !== 2 || parts[0] !== "Bearer") {
//             return res.status(401).json({ error: "Invalid token format" });
//         }

//         const token = parts[1];

//         const decoded = jwt.verify(token, SECRET);

//         req.user = decoded;

//         next();

//     } catch (err) {
//         console.error("JWT ERROR:", err.message);

//         return res.status(401).json({
//             error: "Unauthorized",
//             message: err.message
//         });
//     }
// };


// module.exports = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split("Bearer ")[1];

//         if (!token) {
//             return res.status(401).json({ error: "No token" });
//         }

//         const decoded = await admin.auth().verifyIdToken(token);

//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.status(401).json({ error: "Invalid token" });
//     }
// };




// module.exports = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split("Bearer ")[1];

//         if (!token) {
//             return res.status(401).json({ error: "No token provided" });
//         }

//         const decoded = await admin.auth().verifyIdToken(token);

//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.status(401).json({ error: "Invalid token" });
//     }
// };






// const { admin } = require("../config/firebase");

// module.exports = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;

//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({ error: "No token provided" });
//         }

//         const token = authHeader.split("Bearer ")[1];

//         const decoded = await admin.auth().verifyIdToken(token);

//         req.user = decoded;

//         next();
//     } catch (err) {
//         console.error("Auth error:", err.message);

//         return res.status(401).json({
//             error: "Invalid token",
//             message: err.message
//         });
//     }
// };




// const jwt = require("jsonwebtoken");

// const SECRET = process.env.JWT_SECRET || "alora_secret_key";

// module.exports = (req, res, next) => {
//     try {
//         const header = req.headers.authorization;

//         if (!header) {
//             return res.status(401).json({ error: "No token provided" });
//         }

//         const token = header.split(" ")[1];

//         const decoded = jwt.verify(token, SECRET);

//         req.user = decoded;

//         next();

//     } catch (err) {
//         return res.status(401).json({
//             error: "Unauthorized",
//             message: err.message
//         });
//     }
// };



const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: "No token" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, SECRET);

        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};