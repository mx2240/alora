// // const express = require("express");
// // const router = express.Router();

// // const deviceController = require("../controllers/device.controller");
// // const auth = require("../middleware/auth.middleware");
// // const controller = require("../controllers/device.controller");

// // // Add device
// // router.post("/add", auth, deviceController.addDevice);

// // // Get devices in house
// // router.get("/house/:houseId", auth, deviceController.getDevices);

// // router.post("/update", controller.updateDevice);
// // router.get("/:houseId", controller.listDevices);


// // module.exports = router;




// const express = require("express");
// const router = express.Router();

// const deviceController = require("../controllers/device.controller");
// const auth = require("../middleware/auth.middleware");

// // secure routes
// router.post("/add", auth, deviceController.addDevice);
// router.get("/house/:houseId", auth, deviceController.getDevices);
// router.post("/update", auth, deviceController.updateDevice);
// router.get("/list/:houseId", auth, deviceController.listDevices);
// module.exports = router;




const router = require("express").Router();

const deviceController = require("../controllers/device.controller");
const auth = require("../middleware/auth.middleware");

// Add device
router.post("/add", auth, deviceController.addDevice);

// Get devices (method 1)
router.get("/house/:houseId", auth, deviceController.getDevices);

// Update device
router.post("/update", auth, deviceController.updateDevice);

// List devices (method 2)
router.get("/list/:houseId", auth, deviceController.listDevices);

module.exports = router;

