const express = require('express')
const router = express.Router()
const controller = require('../controller/role')


router.get('/fetchs', controller.fetchs);
router.post('/update', controller.update);



module.exports = router
