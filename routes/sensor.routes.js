// const router = require("express").Router();
// const controller = require("../controllers/sensor.controller");

// router.post("/upload", controller.uploadSensors);
// module.exports = router;




// const router = require("express").Router();
// const controller = require("../controllers/sensor.controller");
// const deviceAuth = require("../middleware/deviceAuth.middleware");

// router.post("/upload", deviceAuth, controller.uploadSensors);

// module.exports = router;



const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensor.controller");
const deviceAuth = require("../middleware/deviceAuth.middleware"); // Verify path matches your file name

// Ensure your device authentication middleware sits in front of the controller
router.post("/upload", deviceAuth, sensorController.uploadSensors);

module.exports = router;
