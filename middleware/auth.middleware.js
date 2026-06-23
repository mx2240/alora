// const jwt = require("jsonwebtoken");

// const SECRET = process.env.JWT_SECRET || "alora_secret_key";

// module.exports = (req, res, next) => {
//     try {
//         const auth = req.headers.authorization;

//         console.log("AUTH:", auth);

//         if (!auth) {
//             return res.status(401).json({
//                 error: "No token"
//             });
//         }

//         const token = auth.split(" ")[1];

//         console.log("TOKEN:", token);
//         console.log("SECRET:", SECRET);

//         req.user = jwt.verify(token, SECRET);

//         console.log("DECODED:", req.user);

//         next();

//     } catch (err) {
//         console.error("JWT ERROR:", err.message);

//         return res.status(401).json({
//             error: "Invalid token",
//             message: err.message
//         });
//     }
// };











const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "No token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};