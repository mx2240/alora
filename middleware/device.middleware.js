


// module.exports = (req, res, next) => {
//     const { devicekey, deviceid } = req.headers;

//     if (!devicekey || !deviceid) {
//         return res.status(403).json({ error: "Missing device auth" });
//     }

//     if (devicekey !== process.env.DEVICE_SECRET) {
//         return res.status(403).json({ error: "Invalid device key" });
//     }

//     req.device = { deviceid };
//     next();
// };




module.exports = (req, res, next) => {
    const { devicekey, deviceid } = req.headers;

    if (!devicekey || !deviceid) {
        return res.status(403).json({ error: "Missing device auth" });
    }

    // FIX: Add a local fallback string to match your local .env configuration 
    const systemSecret = process.env.DEVICE_SECRET || "alora_device_123";

    if (devicekey !== systemSecret) {
        return res.status(403).json({ error: "Invalid device key" });
    }

    req.device = { deviceid };
    next();
};
