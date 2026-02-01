const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const redis = require("../lib/redis.js");

const getMyTokens = function (userId) {
    const accessToken = jwt.sign({ userId }, process.env.SECRET_ACCESS_TOKEN, {
        expiresIn: "10m",
    });
    const refreshToken = jwt.sign(
        { userId },
        process.env.SECRET_REFRESH_TOKEN,
        {
            expiresIn: "10d",
        },
    );
    return { accessToken, refreshToken };
};

const saveRefreshToken = async (userId, refreshToken) => {
    await redis.set(
        `refresh_token:${userId}`,
        refreshToken,
        "EX",
        7 * 24 * 60 * 60,
    );
};

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true, //protect from XSS hacking
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", //prevents CSRF attacks
        maxAge: 10 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, //protect from XSS hacking
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", //prevents CSRF attacks
        maxAge: 10 * 24 * 60 * 60 * 1000,
    });
};

const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const userIsInDB = await User.findOne({ email });

        if (userIsInDB) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await User.create({ name, email, password });

        //AUTHENTICATION
        const { accessToken, refreshToken } = getMyTokens(newUser._id);
        await saveRefreshToken(newUser._id, refreshToken);

        setCookies(res, accessToken, refreshToken);

        res.status(201).json({
            newUser: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
            message: "User created successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // res.send("signup");
};

const login = async (req, res) => {
    res.send("login");
};

const logout = async (req, res) => {
    res.send("logout");
};

module.exports = {
    signup,
    login,
    logout,
};
