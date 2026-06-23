const authService = require("../services/auth.service");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userId = await authService.register(name, email, password);
        res.json({ success: true, userId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.json({ token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};
