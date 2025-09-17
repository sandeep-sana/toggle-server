const express = require('express')
const router = express.Router()
const controller = require('../controller/masterBindingRule')



router.get('/fetchs', controller.fetchs);
router.get('/fetch/:_id', controller.fetch);

router.post('/add', controller.add);
router.post('/update/:_id', controller.update);

router.delete('/delete/:_id', controller.deleteMaster);









module.exports = router
