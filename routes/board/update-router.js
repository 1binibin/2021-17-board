const path = require('path')
const express = require('express')
const router = express.Router()
// const { error } = require('../../modules/util')
// const { pool } = require('../../modules/mysql-init')

router.get('/:idx', (req, res, next) => {
	res.json('update 왓음')
})


module.exports = router