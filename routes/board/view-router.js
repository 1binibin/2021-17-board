const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.get('/:idx', async (req, res, next) => {
	req.app.locals.PAGE = 'VIEW'
	let sql, values;
	try {
		sql = `
		SELECT B.*, 
		FROM boards B`
		values = [req.params.idx]
		const[[boards]] = await pool.execute(sql, values)
		console.log(boards)
		const css = 'board/view'
		const js = 'board/view'
		res.status(200).render('board/view', { css, js })
	} 
	catch (err) {
		
	}
})


module.exports = router