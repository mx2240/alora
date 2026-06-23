const { db } = require("../config/firebase");

exports.updateDevice = async (req, res) => {
    try {
        const { houseId, deviceId, state } = req.body;

        await db.ref(`houses/${houseId}/devices/${deviceId}`).update({
            state,
            updatedAt: Date.now()
        });

        return res.json({ success: true });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.pushSensorData = async (req, res) => {
    try {
        const { houseId, data } = req.body;

        await db.ref(`houses/${houseId}/sensors`).push({
            ...data,
            timestamp: Date.now()
        });

        return res.json({ success: true });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};