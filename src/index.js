require("dotenv").config();
const express = require("express");
const rootRoutes = require("./routes/index.route");
const authMiddleware = require("./middlewares/authMiddleware");
require("./config/db.config");

const app = express();

// Middlewares
require("./middlewares/index.middlewares")(app, express);

app.get("/", authMiddleware, (req, res) => {
  res.send("all okay");
});
app.use("/api/v1", rootRoutes);

const PORT = process.env.PORT || 7666;
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
