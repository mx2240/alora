const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);

// OPTIONAL (only if function exists)
router.post("/profile", authController.createUserProfile);

module.exports = router;