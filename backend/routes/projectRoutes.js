const express = require('express');
const router = express.Router();
const { getMyProjects, getProjects, createProject, updateProject } = require('../controllers/projectController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, admin, getProjects)
  .post(protect, admin, createProject);

router.route('/:id').put(protect, admin, updateProject);

router.route('/my-projects').get(protect, getMyProjects);

module.exports = router;
