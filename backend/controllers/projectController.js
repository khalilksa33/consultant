const Project = require('../models/Project');

// @desc    Get client projects
// @route   GET /api/projects/my-projects
// @access  Private (Client)
const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ client: req.user._id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private (Admin)
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).populate('client', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMyProjects, getProjects };
