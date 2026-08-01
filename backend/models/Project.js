const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['Pending', 'In Design', 'Under Review', 'Permitting', 'Supervision', 'Completed'],
    default: 'Pending',
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  }
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
