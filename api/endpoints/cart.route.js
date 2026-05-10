const express = require("express");
const {
    addTOCart,
    removeAllFromCart,
    updateQuantity,
    getCartProducts,
} = require("../handlers/cart.controller.js");
const { protectRoute } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addTOCart);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);

module.exports = router;
