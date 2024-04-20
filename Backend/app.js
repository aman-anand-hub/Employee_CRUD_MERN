const express = require("express");
const httpStatus = require("http-status");
const cors = require("cors");

const userRoutes = require("./route/user.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());


app.use("/user", userRoutes);


app.use((req, res, next) => {
    next("No route Found");
});

module.exports = app;