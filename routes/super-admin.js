const express = require('express')
const router = express.Router()
const controller = require('../controller/super-admin')

router.post('/account', controller.saveAccount);
router.get('/account', controller.fetchAccount);
router.get('/accounts', controller.fetchAccounts);
router.get('/account/:_id', controller.fetchAccountById);
router.get('/accountReject/:_id', controller.fetchAccountRejectById);


module.exports = router
