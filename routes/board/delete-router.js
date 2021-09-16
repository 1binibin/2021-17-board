const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { error,moveFile } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.delete('/', async (req, res, next) => {
	res.json('delete 왔다')
})


module.exports = router