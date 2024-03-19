const express = require('express');
const router = express.Router();
const authController = require('../../controllers/Patient/authController');

router.post('/', authController.handleLogin);

module.exports = router;