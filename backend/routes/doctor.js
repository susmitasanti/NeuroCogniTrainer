const express = require('express');
const router = express.Router();

router.use('/register', require('./Doctor/register'))
router.use('/refresh', require("./Doctor/refresh"));
router.use('/auth', require("./Doctor/auth"));
router.use('/logout', require("./Doctor/logout"));

router.use('/registerPatient', require("./Patient/register"));



module.exports = router;

