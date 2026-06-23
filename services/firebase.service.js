// const admin = require("firebase-admin");
// const serviceAccount = require("../../serviceAccountKey.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://voice-ai-iot-default-rtdb.firebaseio.com/"
// });

// const db = admin.database();

// module.exports = { admin, db };




const { db } = require("../config/firebase");

// Update device state
exports.setDeviceState = async (houseId, deviceId, state) => {
    await db.ref(`houses/${houseId}/devices/${deviceId}`).update({
        state,
        updatedAt: Date.now()
    });
};

// Push sensor data
exports.pushSensors = async (houseId, data) => {
    await db.ref(`houses/${houseId}/sensors`).set({
        ...data,
        updatedAt: Date.now()
    });
};

// Get devices
exports.getDevices = async (houseId) => {
    const snap = await db.ref(`houses/${houseId}/devices`).once("value");
    return snap.val();
};