const mongoose = require("mongoose");

const setupDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URI);
        console.log(connection.connection.host);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = setupDatabase;
