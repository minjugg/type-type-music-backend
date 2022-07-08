require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const middleware = require("./src/middleware");
const indexRouter = require("./routes/index");
const connectMongoDB = require("./src/config/connect-mongoDB");

connectMongoDB();

app.use(cors());
app.use(middleware.authTokenMiddleware);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
