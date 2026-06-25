// // // const express = require("express");
// // // const router = express.Router();

// // // const deviceController = require("../controllers/device.controller");
// // // const auth = require("../middleware/auth.middleware");
// // // const controller = require("../controllers/device.controller");

// // // // Add device
// // // router.post("/add", auth, deviceController.addDevice);

// // // // Get devices in house
// // // router.get("/house/:houseId", auth, deviceController.getDevices);

// // // router.post("/update", controller.updateDevice);
// // // router.get("/:houseId", controller.listDevices);


// // // module.exports = router;



// const router = require("express").Router();

// const deviceController = require("../controllers/device.controller");
// const auth = require("../middleware/auth.middleware");

// // Add device
// router.post("/add", auth, deviceController.addDevice);

// // Get devices (method 1)
// router.get("/house/:houseId", auth, deviceController.getDevices);

// // Update device
// router.post("/update", auth, deviceController.updateDevice);

// // List devices (method 2)
// router.get("/list/:houseId", auth, deviceController.listDevices);

// module.exports = router;





const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/device.controller");
const auth = require("../middleware/auth.middleware");

// Existing Management Routes
router.post("/add", auth, deviceController.addDevice);
router.get("/list/:houseId", auth, deviceController.listDevices);
router.post("/update-state", auth, deviceController.updateDevice);
router.delete("/delete/:deviceId", auth, deviceController.deleteDevice);

// LED & Door Commands
router.post("/led/on", auth, deviceController.ledOn);
router.post("/led/off", auth, deviceController.ledOff);
router.post("/door/open", auth, deviceController.doorOpen);
router.post("/door/close", auth, deviceController.doorClose);

// NEW: Window, RGB, and Laser Commands
router.post("/window/open", auth, deviceController.windowOpen);
router.post("/window/close", auth, deviceController.windowClose); // Added for logical completeness
router.post("/rgb", auth, deviceController.rgbControl);
router.post("/laser", auth, deviceController.laserControl);

module.exports = router;

