const express = require("express");
const router = express.Router();
const authController = require("./controller/login.controller");

router.get("/", authController.login);

module.exports = router;
