const express = require("express");
const UserController = require("../controllers/user.controller");
const ValidateSchema = require("../middlewares/SchemaValidation");
const {
  signUpSchema,
  signInSchema,
  UserSchema,
} = require("../utils/ZodSchemas");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.put(
  "/",
  authMiddleware,
  ValidateSchema(UserSchema),
  UserController.updateUser
);
router.get("/bulk", authMiddleware, UserController.getAllUser);
router.post("/signin", ValidateSchema(signInSchema), UserController.signIn);
router.post("/signup", ValidateSchema(signUpSchema), UserController.signUp);

module.exports = router;
