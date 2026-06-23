// 1. MUST BE THE VERY FIRST LINE
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// 2. Your routes are imported AFTER dotenv loads the variables
const houseRoutes = require("./routes/house.routes");
const authRoutes = require("./routes/auth.routes");
const deviceRoutes = require("./routes/device.routes");
const sensorRoutes = require("./routes/sensor.routes");

const app = express();

app.use(helmet());

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        name: "Alora Backend",
        version: "2.0.0",
        status: "running"
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: Date.now()
    });
});

// Routes
app.use("/api/house", houseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/sensor", sensorRoutes);

module.exports = app;
