// const houseService = require("../services/house.service");

// exports.createHouse = async (req, res) => {
//     const houseId = await houseService.createHouse(req.user.id, req.body.name);
//     res.json({ houseId });
// };

// exports.getMyHouses = async (req, res) => {
//     const houses = await houseService.getUserHouses(req.user.id);
//     res.json(houses);
// };




const { db } = require("../config/firebase");

exports.createHouse = async (req, res) => {
    try {
        const { name } = req.body;

        const houseId = Date.now().toString();

        const house = {
            houseId,
            name,
            ownerId: req.user.userId,
            createdAt: Date.now()
        };

        await db.ref(`houses/${houseId}`).set(house);

        // attach house to user
        await db.ref(`users/${req.user.userId}/houses/${houseId}`).set(true);

        res.json({ message: "House created", house });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserHouses = async (req, res) => {
    try {
        const snapshot = await db.ref("houses")
            .orderByChild("ownerId")
            .equalTo(req.user.userId)
            .once("value");

        const houses = snapshot.val() || {};

        res.json(houses);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};