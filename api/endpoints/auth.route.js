const express = require("express");
const {
    signup,
    login,
    logout,
    refreshToken,
} = require("../handlers/auth.controller.js");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", refreshToken);

module.exports = router;
