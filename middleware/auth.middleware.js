// // const jwt = require("jsonwebtoken");

// // // Ensure fallback values match perfectly
// // const SECRET = process.env.JWT_SECRET || "alora_secret_key";

// // module.exports = (req, res, next) => {
// //     const authHeader = req.headers.authorization;

// //     if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //         return res.status(401).json({
// //             error: "Invalid token format",
// //             message: "Authorization header must start with 'Bearer '"
// //         });
// //     }

// //     // FIX: Grab index [1] to isolate the clean token string string
// //     const token = authHeader.split(" ")[1];

// //     if (!token) {
// //         return res.status(401).json({
// //             error: "Invalid token",
// //             message: "Token missing from Bearer format"
// //         });
// //     }

// //     try {
// //         const decoded = jwt.verify(token, SECRET);
// //         req.user = decoded; // Attaches uid and email to the request object
// //         next();
// //     } catch (err) {
// //         return res.status(401).json({
// //             error: "Invalid token",
// //             message: err.message // This tells you exactly why (e.g., "invalid signature")
// //         });
// //     }
// // };




// const jwt = require("jsonwebtoken");
// const SECRET = process.env.JWT_SECRET || "alora_secret_key";

// module.exports = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({
//             error: "Invalid token",
//             message: "Missing Bearer prefix or Authorization header"
//         });
//     }

//     // CRITICAL FIX: Extract index 1 to get the string, not the array!
//     const token = authHeader.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({
//             error: "Invalid token",
//             message: "Token string component is completely missing"
//         });
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET);
//         req.user = decoded; // Sets req.user.uid and req.user.email
//         next();
//     } catch (err) {
//         // EXPOSE THE TRUTH: This will show if it's "jwt expired" or "invalid signature"
//         return res.status(401).json({
//             error: "Invalid token",
//             message: err.message
//         });
//     }
// };




const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "alora_secret_key";

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Invalid token",
            message: "Missing Bearer prefix or Authorization header missing"
        });
    }

    // 1. Extract and immediately use .trim() to wipe out accidental line-breaks or spaces
    let token = authHeader.split(" ");

    if (!token) {
        return res.status(401).json({
            error: "Invalid token",
            message: "Token string component is completely missing"
        });
    }

    // 2. Clean out potential accidental wrap quotes if Postman passed it as a literal string
    token = token.replace(/^["']|["']$/g, "").trim();

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        // 3. LOG IT TO THE SERVER TERMINAL DIRECTLY: See the raw error in your terminal console
        console.error("❌ JWT VERIFICATION CRASHED. Reason:", err.message);
        console.error("Token processed was length:", token.length);
        console.error("Secret environment state is defined:", !!process.env.JWT_SECRET);

        return res.status(401).json({
            error: "Invalid token",
            message: err.message,
            debug_info: "Check your Node server terminal window for the logs!"
        });
    }
};
