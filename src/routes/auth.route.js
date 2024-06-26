const express = require("express");
const AuthController = require("../controllers/auth.controller");
const router = express.Router();

router.get("/", AuthController.signIn);

module.exports = router;
