const express = require('express');
const router = express.Router();
const authController = require('../../controllers/Doctor/authController');

router.post('/', authController.handleLogin);

module.exports = router;