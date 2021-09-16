const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { relPath } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.get('/',(req, res, next) => {
	req.app.locals.PAGE = 'CREATE'
	const css = 'board/write'
	const js = 'board/write'
	const board = null
	res.status(200).render('board/write', { css, js, board })
})

router.get('/:id', async(req, res, next) => {
	req.app.locals.PAGE = 'UPDATE'
	try {
		const sql= `
				SELECT B.*, F.realname, F.savename 
				FROM boards B  
				LEFT  JOIN  files F ON B.id = F.fid
				WHERE 'status'>'0' AND B.id=?
				`
		const values = [ req.params.id ]
		const [[board]] = await pool.execute(sql,values)
		
		if(board){
			board.savename = board.savename ? relPath(board.savename) : null
		}

		const css = 'board/write'
		const js = 'board/write'
		res.status(200).render('board/write', { css, js, board })
	} 
	catch (err) {
		next(createError(err))
	}
})



module.exports = router