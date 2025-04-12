const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

router.use('/auth', authRoutes);
router.get('/users', authenticateToken, userController.getUsers);

module.exports = router;
