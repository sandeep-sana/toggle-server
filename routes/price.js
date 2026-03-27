const express = require('express')
const router = express.Router()
const controller = require('../controller/price')

router.get('/fetch', controller.fetch);
router.get('/fetchs', controller.fetchs);

router.post('/add', controller.add);
router.put('/update', controller.update);

router.delete('/delete', controller.deletePrice);

module.exports = router
