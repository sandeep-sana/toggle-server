const express = require('express');
const router = express.Router();

const user = require('./user');
const role = require('./role');
router.use('/user', user);
router.use('/role', role);

module.exports = router
