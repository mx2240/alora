const { db } = require("../config/firebase");

// CREATE DEVICE
exports.addDevice = async (ownerId, houseId, name, type) => {
    if (!ownerId) {
        throw new Error("ownerId is required");
    }

    const ref = db.ref(`houses/${houseId}/devices`).push();

    const deviceData = {
        id: ref.key,
        ownerId,
        houseId,
        name,
        type,
        state: false,
        createdAt: Date.now()
    };

    await ref.set(deviceData);

    return ref.key;
};


// GET DEVICES FOR HOUSE
exports.getHouseDevices = async (houseId) => {
    const snapshot = await db.ref(`houses/${houseId}/devices`).once("value");

    const devices = [];

    snapshot.forEach(child => {
        devices.push({
            id: child.key,
            ...child.val()
        });
    });

    return devices;
};