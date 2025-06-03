const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String, trim: true }],
    assignedUsers: [{ type: String, trim: true }],
    mentionedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    notes: [noteSchema],

  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);
