


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


