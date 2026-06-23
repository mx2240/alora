// const express = require("express");
// const cors = require("cors");

// const authRoutes = require("./routes/auth.routes");
// const houseRoutes = require("./routes/house.routes");
// const deviceRoutes = require("./routes/device.routes");
// const sensorRoutes = require("./routes/sensor.routes")

// const app = express();

// // ================= MIDDLEWARE =================
// app.use(cors());

// // MUST be FIRST for body parsing
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // DEBUG MIDDLEWARE
// app.use((req, res, next) => {
//     console.log("➡️", req.method, req.url);
//     console.log("BODY:", req.body);
//     next();
// });

// // ================= ROUTES =================
// app.use("/api/auth", authRoutes);
// app.use("/api/house", houseRoutes);
// app.use("/api/device", deviceRoutes);
// app.use("/api/sensor", sensorRoutes);

// // ================= TEST ROUTES =================
// app.get("/", (req, res) => {
//     res.send("🔥 Alora Backend is Running");
// });

// app.get("/health", (req, res) => {
//     res.json({ status: "OK", time: new Date() });
// });

// module.exports = app;


const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");


const houseRoutes = require("./routes/house.routes");
const authRoutes = require("./routes/auth.routes");
const deviceRoutes = require("./routes/device.routes");
const sensorRoutes = require("./routes/sensor.routes")

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






// const express = require("express");
// const cors = require("cors");

// const authRoutes = require("./routes/auth.routes");
// const deviceRoutes = require("./routes/device.routes");
// const sensorRoutes = require("./routes/sensor.routes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/device", deviceRoutes);
// app.use("/api/sensor", sensorRoutes);

// app.get("/", (req, res) => {
//     res.send("ALORA V2 BACKEND RUNNING");
// });

// module.exports = app;