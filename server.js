// const app = require("./app");

// const PORT = 3000;

// app.listen(PORT, () => {
//     console.log(`✅ Server running on http://localhost:${PORT}`);
// });



require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("");
    console.log("===================================");
    console.log("🚀 ALORA BACKEND V2");
    console.log("===================================");
    console.log(`Server: http://localhost:${PORT}`);
    console.log(`Health: http://localhost:${PORT}/health`);
    console.log("===================================");
    console.log("");
});



// const app = require("./src/app");

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log("🔥 ALORA BACKEND V2 RUNNING");
//     console.log("http://localhost:" + PORT);
// });