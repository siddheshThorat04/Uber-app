const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const connectDB = require("./db/db");
connectDB();

const express = require("express");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/users", require("./routes/user.routes"));
app.get("/", (req, res) => {
  res.send("hello");
});

module.exports = app;
