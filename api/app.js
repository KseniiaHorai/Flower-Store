const express = require("express");
const dotenv = require("dotenv");

const authRoutes = require("./endpoints/auth.route.js");
const setupDatabase = require("./lib/database.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Listening on port 4000");

    setupDatabase();
});
