const express = require("express");
const AccountController = require("../controllers/account.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/balance", authMiddleware, AccountController.getBalance);
router.post("/transfer", authMiddleware, AccountController.transferMoney);

module.exports = router;
