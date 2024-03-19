const express = require('express');
const router = express.Router();
const refreshTokenController = require('../../controllers/Patient/refreshTokenController');

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;