const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader && authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }
  const privateKey = String(process.env.PRIVATE_KEY).trim();
  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, privateKey, { algorithm: "HS256" });
    req.userId = decode.id;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = authMiddleware;
