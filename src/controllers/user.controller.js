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
    return res
      .status(200)
      .json({ message: "Sign In success!", user: sanitizedUser(user) });
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
    return res.status(200).json({
      message: "User created successfully!",
      user: sanitizedUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { password, firstName, lastName } = req.body;
    const id = req.userId;
    if (!id) {
      return res.status(401).json({ error: "Unauthorized - Missing token" });
    }
    const user = await User.findOne({ _id: id }, { username: 0 }).exec();
    if (!user) {
      res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    password && (user.password = password);
    firstName && (user.firstName = firstName);
    lastName && (user.lastName = lastName);
    await user.save();
    return res.status(200).json({
      message: "Profile updated successfully!",
      user: sanitizedUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const id = req.userId;
    if (!id) {
      return res.status(401).json({ error: "Unauthorized - Missing token" });
    }
    const filter = req.query.filter || "";
    const users = await User.find(
      {
        $or: [
          {
            firstName: {
              $regex: filter,
              $options: "i",
            },
          },
          {
            lastName: {
              $regex: filter,
              $options: "i",
            },
          },
        ],
      },
      { username: 0, password: 0 }
    ).exec();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  signIn,
  signUp,
  updateUser,
  getAllUser,
};
