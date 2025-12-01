const express = require('express')
const router = express.Router()
const controller = require('../../controller/fixed/task')

router.get('/fetch', controller.fetch);
router.get('/fetchs', controller.fetchs);

router.post('/update', controller.update);

router.delete('/delete', controller.deleteTask);

module.exports = router
