const express = require("express");
const router = express.Router();
const espController = require("../controllers/esp.controller");

// ESP32 device update
router.post("/device/update", espController.updateDevice);

// ESP32 sensor push
router.post("/sensor/push", espController.pushSensorData);

module.exports = router;