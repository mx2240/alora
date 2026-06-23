const { db } = require("../config/firebase");

// Create device inside a house
exports.addDevice = async (userId, houseId, name, type) => {
    const ref = db.ref("devices").push();

    await ref.set({
        ownerId: userId,
        houseId,
        name,
        type
    });

    return ref.key;
};

// Get devices for a house
exports.getHouseDevices = async (houseId) => {
    const snapshot = await db.ref("devices").once("value");

    let devices = [];

    snapshot.forEach(child => {
        const data = child.val();
        if (data.houseId === houseId) {
            devices.push({ id: child.key, ...data });
        }
    });

    return devices;
};