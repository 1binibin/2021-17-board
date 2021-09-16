const path = require('path')
const express = require('express');
const moment = require('moment')
const router = express.Router()
const createError = require('http-errors')
const { pool } = require('../../modules/mysql-init');
const { cutTail, chgStatus, getIcon, relPath } = require('../../modules/util')
const createPager = require('../../modules/pager-init')

router.get(['/', '/:page'], async (req, res, next) => {
	req.app.locals.PAGE = 'LIST'
	let sql, values;
	try {
		sql = " SELECT COUNT(id) FROM boards WHERE status > '0' "
		const [[cnt]] = await pool.execute(sql)
		const totalRecord = cnt['COUNT(id)']
		const page = Number(req.params.page || 1)
		const pager = createPager(page, totalRecord, 5, 3)
		
		sql = ` SELECT B.* FROM boards B ORDER BY B.id DESC LIMIT ?,?`
		values = [pager.startIdx.toString(), pager.listCnt.toString()]
		const [boards] = await pool.execute(sql, values)
	
		boards.forEach(v => {
			v.createdAt = moment(v.createdAt).format('YYYY-MM-DD')
			v.content = cutTail(v.content)
		})
		const css = 'board/list'
		const js = 'board/list'
		res.status(200).render('board/list', { css, js, boards, pager })
	} 
	catch (err) {
		next(createError(err))
	}
})


module.exports = router