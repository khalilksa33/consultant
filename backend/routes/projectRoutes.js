const express = require('express');
const router = express.Router();
const { getMyProjects, getProjects } = require('../controllers/projectController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getProjects);
router.route('/my-projects').get(protect, getMyProjects);

module.exports = router;
