const path = require('path')
const express = require('express')
const router = express.Router()
// const { error } = require('../../modules/util')
// const { pool } = require('../../modules/mysql-init')
const listRouter = require('./list-router')
const viewRouter = require('./view-router')

router.use('/', listRouter)
router.use('/view', viewRouter)

module.exports = router