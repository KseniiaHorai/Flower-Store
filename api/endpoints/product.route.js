const express = require("express");
const {
    getAllProducts,
    getFeaturedProducts,
    createProduct,
    deleteProduct,
    getRecommendedProducts,
    getProductsByCategory,
} = require("../handlers/product.controller.js");
const { protectRoute } = require("../middleware/auth.middleware.js");
const { adminRoute } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

module.exports = router;
