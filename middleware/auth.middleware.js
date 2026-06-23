// // const jwt = require("jsonwebtoken");

// // const SECRET = process.env.JWT_SECRET || "alora_secret_key";

// // module.exports = (req, res, next) => {
// //     try {
// //         const auth = req.headers.authorization;

// //         console.log("AUTH:", auth);

// //         if (!auth) {
// //             return res.status(401).json({
// //                 error: "No token"
// //             });
// //         }

// //         const token = auth.split(" ")[1];

// //         console.log("TOKEN:", token);
// //         console.log("SECRET:", SECRET);

// //         req.user = jwt.verify(token, SECRET);

// //         console.log("DECODED:", req.user);

// //         next();

// //     } catch (err) {
// //         console.error("JWT ERROR:", err.message);

// //         return res.status(401).json({
// //             error: "Invalid token",
// //             message: err.message
// //         });
// //     }
// // };











// // const jwt = require("jsonwebtoken");

// // module.exports = (req, res, next) => {
// //     const authHeader = req.headers.authorization;

// //     if (!authHeader) {
// //         return res.status(401).json({ error: "No token" });
// //     }

// //     const token = authHeader.split(" ")[1];

// //     try {
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //         req.user = decoded;
// //         next();
// //     } catch (err) {
// //         return res.status(401).json({ error: "Invalid token" });
// //     }
// // };


// // const jwt = require("jsonwebtoken");

// // module.exports = (req, res, next) => {
// //     const authHeader = req.headers.authorization;

// //     if (!authHeader) {
// //         return res.status(401).json({ error: "No token provided" });
// //     }

// //     const token = authHeader.split(" ")[1];

// //     try {
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //         req.user = decoded || {};

// //         if (!req.user.uid) {
// //             return res.status(401).json({
// //                 error: "Invalid token payload (missing uid)"
// //             });
// //         }

// //         next();

// //     } catch (err) {
// //         return res.status(401).json({
// //             error: "Invalid token",
// //             message: err.message
// //         });
// //     }
// // };



// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     try {
//         const header = req.headers.authorization;

//         if (!header) {
//             return res.status(401).json({ error: "No token provided" });
//         }

//         const token = header.split(" ")[1];

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         if (!decoded.uid) {
//             return res.status(401).json({ error: "Invalid token payload" });
//         }

//         req.user = decoded;

//         next();
//     } catch (err) {
//         res.status(401).json({
//             error: "Invalid token",
//             message: err.message
//         });
//     }

//     console.log("USER FROM TOKEN:", req.user);
// };





const jwt = require("jsonwebtoken");

// Match your fallback secret strategy across the entire app
const SECRET = process.env.JWT_SECRET || "alora_secret_key";

module.exports = (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Invalid token format",
                message: "Authorization header missing or does not start with Bearer"
            });
        }

        // Clean out spaces and potential lingering quotes from Postman variables
        const token = header.split(" ")[1]?.trim().replace(/^["']|["']$/g, "");

        if (!token) {
            return res.status(401).json({
                error: "Invalid token",
                message: "Token missing from authorization header"
            });
        }

        // Verify the parsed string using the uniform key
        const decoded = jwt.verify(token, SECRET);

        if (!decoded || !decoded.uid) {
            return res.status(401).json({
                error: "Invalid token payload",
                message: "The verified token does not contain a valid user uid"
            });
        }

        // Attach payload to request data safely
        req.user = decoded;

        // FIXED: Log statement placed BEFORE running next() to avoid execution freezing crashes
        console.log("✅ USER AUTHENTICATED SUCCESSFULLY FROM TOKEN:", req.user.uid);

        return next(); // Explicit return statement prevents further middleware loop execution

    } catch (err) {
        console.error("❌ JWT VERIFICATION MIDDLEWARE ERROR:", err.message);

        return res.status(401).json({
            error: "Invalid token",
            message: err.message
        });
    }
};
