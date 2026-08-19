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

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res) => {
  try {
    const { title, description, client, status, progress } = req.body;

    const project = new Project({
      title,
      description,
      client,
      status: status || 'Pending',
      progress: progress || 0,
    });

    const createdProject = await project.save();
    // Populate client before sending back so UI gets client details
    await createdProject.populate('client', 'name email');
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res) => {
  try {
    const { title, description, client, status, progress } = req.body;

    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = title || project.title;
      project.description = description !== undefined ? description : project.description;
      project.client = client || project.client;
      project.status = status || project.status;
      project.progress = progress !== undefined ? progress : project.progress;

      const updatedProject = await project.save();
      await updatedProject.populate('client', 'name email');
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMyProjects, getProjects, createProject, updateProject };
