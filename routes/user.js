const express = require('express')
const router = express.Router()
const controller = require('../controller/user')

router.get('/user', controller.fetchUser);
router.get('/users', controller.fetchUsers);
router.get('/user/:_id', controller.fetchUserById);

router.post('/user', controller.saveUser);
router.post('/user/:_id', controller.updateUserById);
router.post('/create-database/:_id', controller.createDatabaseById);



module.exports = router
