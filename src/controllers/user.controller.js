const User = require("../models/User");
const sanitizedUser = (user) => ({
  ...user.toObject({ transform: true, versionKey: false }),
  password: undefined,
});

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username: username.toLowerCase(),
    }).exec();
    if (!user) {
      return res.status(401).json({ error: "User doesn't exist" });
    }
    const auth = await user.comparePassword(password);
    if (!auth) {
      return res
        .status(401)
        .json({ error: "Username or password doesn't match" });
    }
    const token = await user.generateToken(user._id);
    res.setHeader("Authorization", token);
    return res.status(200).json({ user: sanitizedUser(user) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const checkUser =
      username &&
      (await User.findOne({ username: username?.toLowerCase() }).exec());
    if (checkUser) {
      return res.status(401).json({ error: "User already exists" });
    }
    const user = new User({ firstName, lastName, username, password });
    await user.save();
    const token = user.generateToken(user._id);

    res.setHeader("Authorization", token);
    delete user.password;
    return res.status(200).json({ user: sanitizedUser(user) });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  signIn,
  signUp,
};
