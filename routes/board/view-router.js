const path = require('path')
const express = require('express')
const router = express.Router()
// const { error } = require('../../modules/util')
// const { pool } = require('../../modules/mysql-init')

router.get('/:idx', (req, res, next) => {
	const css = 'board/view'
	const js = 'board/view'
	res.status(200).render('board/view', { css, js })
})


module.exports = router