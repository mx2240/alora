// 1. MUST BE THE VERY FIRST LINE
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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


// Add the Chat Route
app.post('/api/ai/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Change this line in app.js
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // System prompt ensures it behaves like Alora
        const prompt = "You are Alora, a smart home AI assistant. Be helpful, concise, and friendly. User says: " + message;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: "Failed to communicate with AI brain." });
    }
});

// Routes
app.use("/api/house", houseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/sensor", sensorRoutes);

module.exports = app;
