require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/dbConfig');
const Todo = require('../models/Todo');

// Use actual ObjectIds from your database
const todos = [
  {
    title: 'Complete project documentation',
    description: 'Finalize and submit the full documentation for the backend project.',
    priority: 'high',
    completed: false,
    user: '683dd8a5b65ada51ea89fc24', // user1
    tags: ['documentation', 'urgent'],
    assignedUsers: ['user2', 'user3'],
    mentionedUsers: ['683dd8a5b65ada51ea89fc25', '683dd8a5b65ada51ea89fc26'], // user2, user3
    notes: [
      { content: 'Add Swagger docs' },
      { content: 'Include database ERD' }
    ]
  },
  {
    title: 'Daily team meeting',
    description: 'Standup meeting to review daily progress and blockers.',
    priority: 'medium',
    completed: false,
    user: '683dd8a5b65ada51ea89fc24', // user1
    tags: ['meeting', 'team'],
    assignedUsers: ['user4'],
    mentionedUsers: ['683dd8a5b65ada51ea89fc27'],
    notes: [
      { content: 'Prepare yesterday’s updates' }
    ]
  },
  {
    title: 'Refactor codebase',
    description: 'Cleanup unused files and optimize code logic.',
    priority: 'medium',
    completed: false,
    user: '683dd8a5b65ada51ea89fc25', // user2
    tags: ['code', 'refactor'],
    assignedUsers: ['user3', 'user5'],
    mentionedUsers: ['683dd8a5b65ada51ea89fc26', '683dd8a5b65ada51ea89fc28'],
    notes: [
      { content: 'Remove deprecated routes' }
    ]
  },
  {
    title: 'Research OAuth Integration',
    description: 'Explore Google and GitHub OAuth for login',
    priority: 'low',
    completed: false,
    user: '683dd8a5b65ada51ea89fc26', // user3
    tags: ['auth', 'research'],
    assignedUsers: ['user1'],
    mentionedUsers: ['683dd8a5b65ada51ea89fc24'],
    notes: []
  },
  {
    title: 'Plan sprint backlog',
    description: 'Prepare backlog items for next sprint planning',
    priority: 'high',
    completed: false,
    user: '683dd8a5b65ada51ea89fc27', // user4
    tags: ['sprint', 'planning'],
    assignedUsers: ['user2'],
    mentionedUsers: ['683dd8a5b65ada51ea89fc25'],
    notes: [
      { content: 'Add user feedback to backlog' }
    ]
  }
];

const seedTodos = async () => {
  try {
    await connectDB();
    await Todo.deleteMany();
    await Todo.insertMany(todos);
    console.log('Todos seeded successfully!');
  } catch (error) {
    console.error('Error seeding todos:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

seedTodos();
