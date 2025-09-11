const express = require('express')
const router = express.Router()
const controller = require('../controller/role')


router.get('/roles', controller.getRoles);

router.post('/role', controller.saveRole);



module.exports = router
