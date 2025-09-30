const express = require('express')
const router = express.Router()
const controller = require('../controller/setting')


router.get('/fetch', controller.fetch);

router.post('/update', controller.update);



module.exports = router
