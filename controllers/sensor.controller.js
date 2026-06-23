// // // const { pushSensors } = require("../services/firebase.service");

// // // exports.uploadSensors = async (req, res) => {
// // //     try {
// // //         const { houseId, temp, hum, light, rain, human } = req.body;

// // //         await pushSensors(houseId, {
// // //             temp,
// // //             hum,
// // //             light,
// // //             rain,
// // //             human
// // //         });

// // //         res.json({ message: "Sensors updated" });
// // //     } catch (err) {
// // //         res.status(500).json({ error: err.message });
// // //     }
// // // };




// // const { db } = require("../config/firebase");

// // exports.uploadSensors = async (req, res) => {
// //     try {
// //         const { houseId, temp, hum, light, rain, human } = req.body;

// //         await db.ref(`houses/${houseId}/sensors`).push({
// //             temp,
// //             hum,
// //             light,
// //             rain,
// //             human,
// //             time: Date.now()
// //         });

// //         res.json({ message: "Sensors saved" });

// //     } catch (err) {
// //         res.status(500).json({ error: err.message });
// //     }
// // };





// const { db } = require("../config/firebase");

// exports.uploadSensors = async (req, res) => {
//     try {
//         const { houseId, temp, hum, light, rain, human } = req.body;

//         await db.ref(`houses/${houseId}/sensors`).push({
//             temp,
//             hum,
//             light,
//             rain,
//             human,
//             timestamp: Date.now()
//         });

//         res.json({ success: true });

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }

//     console.log("HEADERS:", req.headers);
//     console.log("USER:", req.user);
// };




const { db } = require("../config/firebase");

exports.uploadSensors = async (req, res) => {
    try {
        const { houseId, temp, hum, light, rain, human } = req.body;

        // 1. Validate mandatory payload inputs before hitting the database
        if (!houseId) {
            return res.status(400).json({ error: "Missing required field: houseId" });
        }

        // 2. Safe asynchronous database injection
        await db.ref(`houses/${houseId}/sensors`).push({
            temp: Number(temp),
            hum: Number(hum),
            light: Number(light),
            rain: Number(rain),
            human: Number(human),
            timestamp: Date.now()
        });

        // 3. FIXED: Place your debugging logs BEFORE sending the HTTP response
        console.log("📊 SENSOR DATA UPLOAD SUCCESS FOR HOUSE:", houseId);
        console.log("🔌 VERIFIED HARDWARE DEVICE ID:", req.device?.deviceid);

        // 4. Send response to close the request lifecycle loop cleanly
        return res.json({ success: true });

    } catch (err) {
        console.error("❌ SENSOR UPLOAD CONTROLLER ERROR:", err.message);
        return res.status(500).json({ error: err.message });
    }
};
