const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const authRoutes = require("./endpoints/auth.route.js");
const productRoutes = require("./endpoints/product.route.js");
const cartRoutes = require("./endpoints/cart.route.js");
const couponRoutes = require("./endpoints/coupon.route.js");

const setupDatabase = require("./lib/database.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);

app.listen(PORT, () => {
    console.log("Listening on port 4000");

    setupDatabase();
});
