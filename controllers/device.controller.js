// const deviceService = require("../services/device.service");
// const { db } = require("../config/firebase");
// const { setDeviceState, getDevices } = require("../services/firebase.service");


// // Add device to house
// exports.addDevice = async (req, res) => {
//     try {
//         const { houseId, name, type } = req.body;

//         const deviceId = await deviceService.addDevice(
//             req.user.uid,   // ✅ FIXED HERE
//             houseId,
//             name,
//             type
//         );

//         res.json({ deviceId });

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// exports.getDevices = async (req, res) => {
//     try {
//         const { houseId } = req.params;

//         const snapshot = await db.ref(`houses/${houseId}/devices`).get();

//         res.json(snapshot.val());

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };




// // Update device state
// exports.updateDevice = async (req, res) => {
//     try {
//         const { houseId, deviceId, state } = req.body;

//         await db.ref(`houses/${houseId}/devices/${deviceId}`).set({
//             state,
//             updatedAt: Date.now()
//         });

//         res.json({ success: true });

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// exports.listDevices = async (req, res) => {
//     try {
//         const { houseId } = req.params;

//         const devices = await getDevices(houseId);

//         res.json(devices);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };







const deviceService = require("../services/device.service");
const { db } = require("../config/firebase");
const { setDeviceState, getDevices } = require("../services/firebase.service");

// 1. Add device to house
exports.addDevice = async (req, res) => {
    try {
        const { houseId, name, type } = req.body;

        if (!houseId || !name) {
            return res.status(400).json({ error: "Missing required fields: houseId and name" });
        }

        const deviceId = await deviceService.addDevice(
            req.user.uid,
            houseId,
            name,
            type
        );

        return res.json({ deviceId });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// 2. Get Raw Firebase snapshot of house devices
exports.getDevices = async (req, res) => {
    try {
        const { houseId } = req.params;

        const snapshot = await db.ref(`houses/${houseId}/devices`).get();
        return res.json(snapshot.val() || {});

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// 3. Update device state inside house array schema
exports.updateDevice = async (req, res) => {
    try {
        const { houseId, deviceId, state } = req.body;

        if (!houseId || !deviceId) {
            return res.status(400).json({ error: "Missing houseId or deviceId" });
        }

        await db.ref(`houses/${houseId}/devices/${deviceId}`).update({
            state,
            updatedAt: Date.now()
        });

        return res.json({ success: true });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// 4. List parsed devices via firebase service wrapper
exports.listDevices = async (req, res) => {
    try {
        const { houseId } = req.params;
        const devices = await getDevices(houseId);
        return res.json(devices || []);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// =========================================================================
// UNIFIED COMMAND ENDPOINTS (Merged safely with complete error handling)
// =========================================================================

// 5. Turn LED ON
// exports.ledOn = async (req, res) => {
//     try {
//         const { houseId } = req.body;
//         if (!houseId) return res.status(400).json({ error: "Missing houseId" });

//         await db.ref(`houses/${houseId}/commands`).update({ led: true });
//         return res.json({ success: true });
//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// };

// // 6. Turn LED OFF
// exports.ledOff = async (req, res) => {
//     try {
//         const { houseId } = req.body;
//         if (!houseId) return res.status(400).json({ error: "Missing houseId" });

//         await db.ref(`houses/${houseId}/commands`).update({ led: false });
//         return res.json({ success: true });
//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// };

// // 7. Trigger Door Open
// exports.doorOpen = async (req, res) => {
//     try {
//         const { houseId } = req.body;
//         if (!houseId) return res.status(400).json({ error: "Missing houseId" });

//         await db.ref(`houses/${houseId}/commands`).update({ door: "open" });
//         return res.json({ success: true });
//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// };

// // 8. Trigger Door Close
// exports.doorClose = async (req, res) => {
//     try {
//         const { houseId } = req.body;
//         if (!houseId) return res.status(400).json({ error: "Missing houseId" });

//         await db.ref(`houses/${houseId}/commands`).update({ door: "close" });
//         return res.json({ success: true });
//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// };


// // 9. Trigger Window Open
// exports.windowOpen = async (req, res) => {
//     try {
//         const { houseId } = req.body;
//         if (!houseId) return res.status(400).json({ error: "Missing houseId" });

//         await db.ref(`houses/${houseId}/commands`).update({ window: "open" });
//         return res.json({ success: true, status: "window open command sent" });
//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// };

// // 10. Trigger Window Close
// exports.windowClose = async (req, res) => {
//     try {
//         const { houseId } = req.body;
//         if (!houseId) return res.status(400).json({ error: "Missing houseId" });

//         await db.ref(`houses/${houseId}/commands`).update({ window: "close" });
//         return res.json({ success: true, status: "window close command sent" });
//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// };

// // 11. Handle RGB Complex Color Payload (e.g., passing "#FF5733" or r,g,b values)
// exports.rgbControl = async (req, res) => {
//     try {
//         const { houseId, color } = req.body;
//         if (!houseId || !color) {
//             return res.status(400).json({ error: "Missing required fields: houseId and color" });
//         }

//         await db.ref(`houses/${houseId}/commands`).update({
//             rgb: color,
//             rgbUpdatedAt: Date.now()
//         });

//         return res.json({ success: true, status: `RGB updated to ${color}` });
//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// };

// // 12. Trigger Laser Toggle (Expects a boolean state parameter true/false)
// exports.laserControl = async (req, res) => {
//     try {
//         const { houseId, state } = req.body;
//         if (!houseId || state === undefined) {
//             return res.status(400).json({ error: "Missing required fields: houseId and state (true/false)" });
//         }

//         await db.ref(`houses/${houseId}/commands`).update({
//             laser: Boolean(state)
//         });

//         return res.json({ success: true, status: `Laser set to ${state}` });
//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }
// };




// =========================================================================
// UNIFIED COMMAND ENDPOINTS (Fixed for Single-Path Firebase Streaming)
// =========================================================================

// 5. Turn LED ON
exports.ledOn = async (req, res) => {
    try {
        const { houseId } = req.body;
        if (!houseId) return res.status(400).json({ error: "Missing houseId" });

        // FIX: Target the exact 'led' path directly
        await db.ref(`houses/${houseId}/commands/led`).set(true);
        return res.json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// 6. Turn LED OFF
exports.ledOff = async (req, res) => {
    try {
        const { houseId } = req.body;
        if (!houseId) return res.status(400).json({ error: "Missing houseId" });

        // FIX: Target the exact 'led' path directly
        await db.ref(`houses/${houseId}/commands/led`).set(false);
        return res.json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// 7. Trigger Door Open
exports.doorOpen = async (req, res) => {
    try {
        const { houseId } = req.body;
        if (!houseId) return res.status(400).json({ error: "Missing houseId" });

        // FIX: Target the exact 'door' path directly
        await db.ref(`houses/${houseId}/commands/door`).set("open");
        return res.json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// 8. Trigger Door Close
exports.doorClose = async (req, res) => {
    try {
        const { houseId } = req.body;
        if (!houseId) return res.status(400).json({ error: "Missing houseId" });

        // FIX: Target the exact 'door' path directly
        await db.ref(`houses/${houseId}/commands/door`).set("close");
        return res.json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// 9. Trigger Window Open
exports.windowOpen = async (req, res) => {
    try {
        const { houseId } = req.body;
        if (!houseId) return res.status(400).json({ error: "Missing houseId" });

        // FIX: Target the exact 'window' path directly
        await db.ref(`houses/${houseId}/commands/window`).set("open");
        return res.json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// 10. Trigger Window Close
exports.windowClose = async (req, res) => {
    try {
        const { houseId } = req.body;
        if (!houseId) return res.status(400).json({ error: "Missing houseId" });

        // FIX: Target the exact 'window' path directly
        await db.ref(`houses/${houseId}/commands/window`).set("close");
        return res.json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// 11. Handle RGB Complex Color Payload
exports.rgbControl = async (req, res) => {
    try {
        const { houseId, color } = req.body;
        if (!houseId || !color) return res.status(400).json({ error: "Missing houseId or color" });

        // FIX: Target the exact 'rgb' path directly
        await db.ref(`houses/${houseId}/commands/rgb`).set(color);
        return res.json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// 12. Trigger Laser Toggle
exports.laserControl = async (req, res) => {
    try {
        const { houseId, state } = req.body;
        if (!houseId || state === undefined) return res.status(400).json({ error: "Missing houseId or state" });

        // FIX: Target the exact 'laser' path directly
        await db.ref(`houses/${houseId}/commands/laser`).set(Boolean(state));
        return res.json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};














