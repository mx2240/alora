


module.exports = (req, res, next) => {
    const { devicekey, deviceid } = req.headers;

    if (!devicekey || !deviceid) {
        return res.status(403).json({ error: "Missing device auth" });
    }

    if (devicekey !== process.env.DEVICE_SECRET) {
        return res.status(403).json({ error: "Invalid device key" });
    }

    req.device = { deviceid };
    next();
};