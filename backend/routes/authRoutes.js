const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, getClients } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.get('/clients', protect, admin, getClients);

module.exports = router;
