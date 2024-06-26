const express = require("express");
const userRoutes = require("./user.route.js");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello World");
});

router.use("/user", userRoutes);

module.exports = router;
