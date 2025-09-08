const express = require('express')
const router = express.Router()
const controller = require('../controller/super-admin')

router.post('/account', controller.saveAccount);
router.get('/account', controller.fetchAccount);


module.exports = router
