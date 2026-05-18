const express = require("express");
const {
    addToCart,
    removeAllFromCart,
    updateQuantity,
    getCartItems,
} = require("../handlers/cart.controller.js");
const { protectRoute } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/", protectRoute, getCartItems);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);

module.exports = router;
