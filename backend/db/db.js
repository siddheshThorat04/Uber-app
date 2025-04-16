const mongoose = require("mongoose");

function connectDB() {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log("DB connected"))
        .catch((err) => console.log(err.message));
}

module.exports = connectDB;