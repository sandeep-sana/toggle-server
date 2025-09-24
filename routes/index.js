const express = require('express');
const router = express.Router();

const user = require('./user');
const task = require('./task');
const role = require('./role');
const master = require('./master');
const department = require('./department');
const dynamicMaster = require('./dynamicMaster');
const masterBindingRule = require('./masterBindingRule');

router.use('/task', task);
router.use('/user', user);
router.use('/role', role);
router.use('/master', master);
router.use('/department', department);
router.use('/dynamicMaster', dynamicMaster);
router.use('/masterBindingRule', masterBindingRule);


module.exports = router
