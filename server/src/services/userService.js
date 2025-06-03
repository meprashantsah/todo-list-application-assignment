const mongoose = require('mongoose');
const User = require('../models/User');

const getAllUsers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const users = await User.find()
    .select('-password -__v')
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await User.countDocuments();

  return { users, total, page, limit };
};

const getUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await User.findById(id).select('-password -__v').lean();
};

const findUserByUsername = async (username) => {
  return await User.findOne({ username: { $regex: `^${username}$`, $options: 'i' } })
    .select('-password -__v')
    .lean();
};

module.exports = {
  getAllUsers,
  getUserById,
  findUserByUsername,
};
