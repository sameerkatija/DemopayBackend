const express = require("express");
const userRoutes = require("./user.route.js");
const accountRoutes = require("./account.route.js");
const router = express.Router();

router.use("/user", userRoutes);
router.use("/account", accountRoutes);

module.exports = router;
