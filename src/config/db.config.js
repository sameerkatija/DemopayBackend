const mongoose = require("mongoose");

const URI = process.env.MONGODBURI;
mongoose
  .connect(URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("Database connection error:", err));
module.exports = mongoose;
