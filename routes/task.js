const express = require('express')
const router = express.Router()
const controller = require('../controller/task')


router.get('/tasks', controller.getTasks);

router.post('/task', controller.saveDepartment);



module.exports = router
