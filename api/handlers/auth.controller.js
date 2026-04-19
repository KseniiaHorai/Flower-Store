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
        10 * 24 * 60 * 60,
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
        console.log("Signup error occured", error.message);
        res.status(500).json({ message: error.message });
    }
    // res.send("signup");
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = await User.findOne({ email });

        if (newUser && (await newUser.comparePassword(password))) {
            const { accessToken, refreshToken } = getMyTokens(newUser._id);

            await saveRefreshToken(newUser._id, refreshToken);
            setCookies(res, accessToken, refreshToken);

            res.json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            });
        }
    } catch (error) {
        console.log("Login error occured", error.message);
        res.status(500).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const decodedData = jwt.verify(
                refreshToken,
                process.env.SECRET_REFRESH_TOKEN,
            );
            await redis.del(`refresh_token:${decodedData.userId}`);
        }
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({ message: "Logout was successful" });
    } catch (error) {
        console.log("Logout error occured", error.message);
        res.status(500).json({
            message: "something is wrong with the server",
            error: error.message,
        });
    }
    // res.send("logout");
};

// this will refresh the access token
const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res
                .status(401)
                .json({ message: "Refresh token is not found" });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.SECRET_REFRESH_TOKEN,
        );
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

        if (storedToken !== refreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const accessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.SECRET_ACCESS_TOKEN,
            { expiresIn: "15m" },
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true, //protect from XSS hacking
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", //prevents CSRF attacks
            maxAge: 10 * 60 * 1000,
        });

        res.json({ message: "Token refreshed successfully" });
    } catch (error) {
        console.log("Error in refreshToken controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    signup,
    login,
    logout,
    refreshToken,
};
