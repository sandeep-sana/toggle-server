const express = require('express')
const router = express.Router()
const superAdminRoute = require('../routes/super-admin')

router.use('/super-admin', superAdminRoute);

module.exports = router
