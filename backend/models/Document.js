const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project',
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  filePath: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
  }
}, {
  timestamps: true,
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
