const express = require('express');
const router = express.Router();

const user = require('./user');
// const task = require('./task');
const role = require('./role');
const form = require('./form');
const price = require('./price');
const master = require('./master');
const website = require('./website');
const setting = require('./setting');
const dashboard = require('./dashboard');
const department = require('./department');
const dynamicMaster = require('./dynamicMaster');
const masterBindingRule = require('./masterBindingRule');

const task = require('./fixed/task');

router.use('/task', task);
router.use('/user', user);
router.use('/role', role);
router.use('/form', form);
router.use('/price', price);
router.use('/master', master);
router.use('/website', website);
router.use('/setting', setting);
router.use('/dashboard', dashboard);
router.use('/department', department);
router.use('/dynamicMaster', dynamicMaster);
router.use('/masterBindingRule', masterBindingRule);


module.exports = router
