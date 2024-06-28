const express = require("express");
const UserController = require("../controllers/user.controller");
const ValidateSchema = require("../middlewares/SchemaValidation");
const { signUpSchema, signInSchema } = require("../utils/ZodSchemas");
const router = express.Router();

router.post("/signin", ValidateSchema(signInSchema), UserController.signIn);
router.post("/signup", ValidateSchema(signUpSchema), UserController.signUp);

module.exports = router;
