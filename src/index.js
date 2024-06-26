require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth.route");
require("./config/db.config");

const app = express();

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 7666;
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
