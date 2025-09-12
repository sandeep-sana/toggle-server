const express = require('express');
const router = express.Router();

const user = require('./user');
const role = require('./role');
const department = require('./department');
router.use('/user', user);
router.use('/role', role);
router.use('/department', department);

module.exports = router
