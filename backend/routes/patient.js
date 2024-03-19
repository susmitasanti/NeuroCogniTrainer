const express = require('express');
const router = express.Router();

router.use('/refresh', require("./Patient/refresh"));
router.use('/auth', require("./Patient/auth"));
router.use('/logout', require("./Patient/logout"));

module.exports = router;