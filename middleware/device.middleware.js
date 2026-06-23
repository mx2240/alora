module.exports = (req, res, next) => {
    const key = req.headers["x-device-key"];

    if (!key || key !== process.env.DEVICE_SECRET) {
        return res.status(403).json({ error: "Unauthorized device" });
    }

    next();
};