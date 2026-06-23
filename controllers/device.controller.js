const deviceService = require("../services/device.service");
const { db } = require("../config/firebase");
const { setDeviceState, getDevices } = require("../services/firebase.service");


// Add device to house
exports.addDevice = async (req, res) => {
    try {
        const { houseId, name, type } = req.body;

        const deviceId = await deviceService.addDevice(
            req.user.id,
            houseId,
            name,
            type
        );

        res.json({ deviceId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get devices of a house
// exports.getDevices = async (req, res) => {
//     try {
//         const { houseId } = req.params;

//         const devices = await deviceService.getHouseDevices(houseId);

//         res.json(devices);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
exports.getDevices = async (req, res) => {
    try {
        const { houseId } = req.params;

        const snapshot = await db.ref(`houses/${houseId}/devices`).get();

        res.json(snapshot.val());

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





// exports.updateDevice = async (req, res) => {
//     try {
//         const { houseId, deviceId, state } = req.body;

//         await setDeviceState(houseId, deviceId, state);

//         res.json({ message: "Device updated" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// Update device state
exports.updateDevice = async (req, res) => {
    try {
        const { houseId, deviceId, state } = req.body;

        await db.ref(`houses/${houseId}/devices/${deviceId}`).set({
            state,
            updatedAt: Date.now()
        });

        res.json({ success: true });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listDevices = async (req, res) => {
    try {
        const { houseId } = req.params;

        const devices = await getDevices(houseId);

        res.json(devices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};











