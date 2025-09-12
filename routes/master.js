const express = require('express')
const router = express.Router()
const controller = require('../controller/master')



router.get('/fetchs', controller.fetchs);
router.get('/fetch/:_id', controller.fetch);

router.post('/add', controller.add);




module.exports = router
