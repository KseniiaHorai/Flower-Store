const express = require("express");
const {
    retrieveAllProducts,
    getStarredProducts,
    createNewProduct,
    removeProduct,
    getSuggestedProducts,
    fetchProductsByCategory,
    toggleStarredProduct,
} = require("../handlers/product.controller.js");
const {
    verifyRoute,
    adminOnlyRoute,
} = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/", verifyRoute, adminOnlyRoute, retrieveAllProducts);
router.get("/featured", getStarredProducts);
router.get("/category/:category", fetchProductsByCategory);
router.get("/recommendations", getSuggestedProducts);
router.post("/", verifyRoute, adminOnlyRoute, createNewProduct);
router.patch("/:id", verifyRoute, adminOnlyRoute, toggleStarredProduct);
router.delete("/:id", verifyRoute, adminOnlyRoute, removeProduct);

module.exports = router;
