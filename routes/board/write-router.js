const path = require('path')
const express = require('express')
const router = express.Router()
// const { error } = require('../../modules/util')
// const { pool } = require('../../modules/mysql-init')

router.get('/',(req, res, next) => {
	const css = 'board/write'
	const js = 'board/write'
	res.status(200).render('board/write', { css, js })
})




module.exports = router