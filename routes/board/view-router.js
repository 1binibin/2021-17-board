const path = require('path')
const express = require('express')
const router = express.Router()
const moment = require('moment')
const createError =require('http-errors')
const { chgStatus, relPath, isImg } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.get('/:id', async (req, res, next) => {
	req.app.locals.PAGE = 'VIEW'
	let sql, values;
	try {
		sql = `
		SELECT B.*, F.realname, F.savename 
		FROM boards B  
		LEFT  JOIN  files F ON B.id = F.fid
		WHERE 'status'>'0' AND B.id=?
		`
		values = [req.params.id]
		const [[board]] = await pool.execute(sql, values)
		console.log(board)

		if(board){
			board.createdAt = moment(board.createdAt).format('YYYY-MM-DD')
			board.savename = board.savename ? relPath(board.savename) : null
		}

		const css = 'board/view'
		const js = 'board/view'
		res.status(200).render('board/view', { css, js, board })
	} 
	catch (err) {
		next(createError(err))
	}
})


module.exports = router