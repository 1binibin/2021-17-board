const path = require('path')
const express = require('express')
const router = express.Router()
// const { error } = require('../../modules/util')
// const { pool } = require('../../modules/mysql-init')

router.get(['/', '/:page'], (req, res, next) => {
	const css = 'board/list'
	const js = 'board/list'
	res.status(200).render('board/list', { css, js })
})


module.exports = router