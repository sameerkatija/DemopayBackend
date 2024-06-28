const ValidateSchema = (Schema) => async (req, res, next) => {
  try {
    const data = { ...req.body };
    Schema.parse(data);
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = ValidateSchema;
