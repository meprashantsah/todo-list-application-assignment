require('dotenv').config();
const connectDB = require('../config/dbConfig');
const mongoose = require('mongoose');
const User = require('../models/User');


const users = [
  { username: 'user1', email: 'user1@example.com' },
  { username: 'user2', email: 'user2@example.com' },
  { username: 'user3', email: 'user3@example.com' },
  { username: 'user4', email: 'user4@example.com' },
  { username: 'user5', email: 'user5@example.com' }
];


const seedUsers = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await User.insertMany(users);

    console.log('Database seeded with users!');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

seedUsers();