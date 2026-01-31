const User = require("../models/User.js");

const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const userIsInDB = await User.findOne({ email });

        if (userIsInDB) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await User.create({ name, email, password });
        res.status(201).json({ newUser, message: "User created successfully" });
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
