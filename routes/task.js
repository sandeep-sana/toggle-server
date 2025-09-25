const express = require('express')
const router = express.Router()
const controller = require('../controller/task')


router.get('/fetchs', controller.fetchs);

router.post('/update', controller.update);



module.exports = router
