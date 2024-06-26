const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: [2, "First name must be at least 2 characters"],
    maxLength: [50, "First name cannot exceed 50 characters"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "Last name must be at least 2 characters"],
    maxLength: [50, "Last name cannot exceed 50 characters"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [3, "Username must be at least 3 characters"],
    maxLength: [50, "username cannot exceed 50 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "password must be at least 8 characters"],
  },
});

module.exports = mongoose.model("User", UserSchema);
