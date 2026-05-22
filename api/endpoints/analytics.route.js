const express = require("express");
const {
    loadAnalyticsData,
    loadDailySalesData,
} = require("../handlers/analytics.controller.js");
const {
    verifyRoute,
    adminOnlyRoute,
} = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/", verifyRoute, adminOnlyRoute, async (req, res) => {
    try {
        const analyticsData = await loadAnalyticsData();

        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

        const dailySalesData = await loadDailySalesData(startDate, endDate);

        res.json({
            analyticsData,
            dailySalesData,
        });
    } catch (error) {
        console.log("Error in analytics route", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
