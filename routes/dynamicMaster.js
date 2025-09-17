const express = require('express')
const router = express.Router()
const controller = require('../controller/dynamicMaster')



router.get('/fetchs/:_id', controller.fetchs);
// router.get('/fetch/:_id', controller.fetch);

router.post('/add/:_id', controller.add);
router.post('/update/:_id/:_listId', controller.update);

router.delete('/delete/:_id/:_listId', controller.deleteDynamicMaster);









module.exports = router
