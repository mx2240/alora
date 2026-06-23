// // const { pushSensors } = require("../services/firebase.service");

// // exports.uploadSensors = async (req, res) => {
// //     try {
// //         const { houseId, temp, hum, light, rain, human } = req.body;

// //         await pushSensors(houseId, {
// //             temp,
// //             hum,
// //             light,
// //             rain,
// //             human
// //         });

// //         res.json({ message: "Sensors updated" });
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
//             time: Date.now()
//         });

//         res.json({ message: "Sensors saved" });

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };





const { db } = require("../config/firebase");

exports.uploadSensors = async (req, res) => {
    try {
        const { houseId, temp, hum, light, rain, human } = req.body;

        await db.ref(`houses/${houseId}/sensors`).push({
            temp,
            hum,
            light,
            rain,
            human,
            timestamp: Date.now()
        });

        res.json({ success: true });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};