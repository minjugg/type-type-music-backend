const express = require("express");
const router = express.Router();

router.get("/login", function (req, res, next) {
  return res.json({ message: "login successfully done" });
});

module.exports = router;
