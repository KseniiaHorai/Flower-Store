const express = require("express");

const { verifyRoute } = require("../middleware/auth.middleware.js");
const {
    handleCheckoutSuccess,
    handleCheckoutSession,
} = require("../handlers/payment.controller.js");

const router = express.Router();

router.post("/create-checkout-session", verifyRoute, handleCheckoutSession);
router.post("/checkout-success", verifyRoute, handleCheckoutSuccess);

module.exports = router;
