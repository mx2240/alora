// const router = require("express").Router();
// const controller = require("../controllers/sensor.controller");

// router.post("/upload", controller.uploadSensors);
// module.exports = router;




const router = require("express").Router();
const controller = require("../controllers/sensor.controller");
const deviceAuth = require("../middleware/device.middleware");

router.post("/upload", deviceAuth, controller.uploadSensors);

module.exports = router;