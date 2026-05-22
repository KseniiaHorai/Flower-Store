const express = require("express");
const {
    addItemToCart,
    deleteAllFromCart,
    updateMyQuantity,
    receiveCartItems,
} = require("../handlers/cart.controller.js");
const { verifyRoute } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/", verifyRoute, receiveCartItems);
router.post("/", verifyRoute, addItemToCart);
router.delete("/", verifyRoute, deleteAllFromCart);
router.put("/:id", verifyRoute, updateMyQuantity);

module.exports = router;
