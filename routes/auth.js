const express = require("express");
const router = express.Router();
const authController = require("../Controller/auth.controller");

router.get("/", authController.login);

module.exports = router;
