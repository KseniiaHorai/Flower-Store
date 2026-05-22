const express = require("express");

const { verifyRoute } = require("../middleware/auth.middleware.js");
const {
    getUserCoupon,
    checkCouponValidity,
} = require("../handlers/coupon.controller.js");

const router = express.Router();

router.get("/", verifyRoute, getUserCoupon);
router.post("/validate", verifyRoute, checkCouponValidity);

module.exports = router;
