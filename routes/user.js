const express = require('express')
const router = express.Router()
const controller = require('../controller/user')



// SANDEEP SANA
router.get('/login', controller.login);
router.get('/modules', controller.modules);
router.get('/request-accounts', controller.requestAccounts);
router.post('/company-signup', controller.companySignup);
router.post('/change-status', controller.changeStatus);

// Uncomment when these handlers exist on controller/user.js:
// router.get('/fetch', controller.fetch);
// router.get('/fetchs', controller.fetchs);
// router.post('/update', controller.update);
// router.post('/add', controller.add);

// router.post('/create-database/:_id', controller.createDatabaseById);
// /**  */

// router.get('/users', controller.users);






// router.get('/user', controller.fetchUser);
// router.get('/user/:_id', controller.fetchUserById);

// router.post('/user/:_id', controller.updateUserById);



module.exports = router
