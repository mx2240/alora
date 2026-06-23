const { db } = require("../config/firebase");

exports.createHouse = async (userId, name) => {
    const houseRef = db.ref("houses").push();

    await houseRef.set({
        ownerId: userId,
        name
    });

    return houseRef.key;
};

exports.getUserHouses = async (userId) => {
    const snapshot = await db.ref("houses").once("value");

    let houses = [];

    snapshot.forEach(child => {
        if (child.val().ownerId === userId) {
            houses.push({ id: child.key, ...child.val() });
        }
    });

    return houses;
};