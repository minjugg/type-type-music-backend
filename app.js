require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./Routes/auth");
const musicRouter = require("./Routes/music");
const connectMongoDB = require("./src/config/connect-mongoDB");

const { checkAuth } = require("./src/middleware/checkAuth");
const { setUsernameParams } = require("./src/middleware/setUsernameParams");
const { errorHandler } = require("./src/middleware/errorHandler");

connectMongoDB();

app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: "Content-Type, charset, Authorization",
  })
);

app.use(checkAuth);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/users/:username/records", setUsernameParams, musicRouter);
app.use("*", (req, res, next) => {
  next("nonExistingPage");
});

app.use(errorHandler);

module.exports = app;
