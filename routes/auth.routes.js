// const express = require("express");
// const router = express.Router();

// const authController = require("../controllers/auth.controller");

// router.post("/register", authController.register);
// router.post("/login", authController.login);s
// router.post("/profile", authController.createUserProfile);

// module.exports = router;




const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const verifyToken = require("../middleware/auth.middleware"); // Your JWT verifier

router.post("/login", authController.login);
router.post("/register", authController.register);

// This is what the Android ProfileFragment calls
router.get("/profile", verifyToken, authController.getProfile);

module.exports = router;