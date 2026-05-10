const express = require("express");
const {
    signup,
    login,
    logout,
    refreshToken,
    getProfile,
} = require("../handlers/auth.controller.js");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", refreshToken);

router.get("/profile", protectRoute, getProfile);

module.exports = router;
