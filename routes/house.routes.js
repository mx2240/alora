// const express = require("express");
// const router = express.Router();
// const houseController = require("../controllers/house.controller");
// const auth = require("../middleware/auth.middleware");

// router.post("/create", auth, houseController.createHouse);
// router.get("/my", auth, houseController.getMyHouses);

// module.exports = router;

const express = require("express");
const router = express.Router();

const controller = require("../controllers/house.controller");
const auth = require("../middleware/auth.middleware");

router.post("/create", auth, controller.createHouse);
router.get("/", auth, controller.getUserHouses);

module.exports = router;