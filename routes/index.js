const express = require('express');
const router = express.Router();

const user = require('./user');
const role = require('./role');
const master = require('./master');
const department = require('./department');
const dynamicMaster = require('./dynamicMaster');

router.use('/user', user);
router.use('/role', role);
router.use('/master', master);
router.use('/department', department);

router.use('/dynamicMaster', dynamicMaster);


module.exports = router
