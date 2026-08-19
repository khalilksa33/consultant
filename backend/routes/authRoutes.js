const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, getClients, registerUser, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:token', resetPassword);

router.get('/profile', protect, getUserProfile);
router.get('/clients', protect, admin, getClients);

module.exports = router;
