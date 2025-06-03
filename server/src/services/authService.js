const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return { user, token };
};

module.exports = {
  registerUser,
  loginUser,
};
