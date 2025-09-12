const express = require('express')
const router = express.Router()
const controller = require('../controller/department')


router.get('/departments', controller.getDepartment);

router.post('/department', controller.saveDepartment);



module.exports = router
