const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { error,moveFile } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.delete('/', async (req, res, next) => {
	try {
		sql = " UPDATE boards SET status='0' WHERE id= " + req.body.id
		await pool.execute(sql)

		sql = " UPDATE files SET status = '0' WHERE fid= " + req.body.id
		await pool.execute(sql)

		sql = " SELECT savename FROM files WHERE fid= " + req.body.id
		await pool.execute(sql)
		const [rs] = await pool.execute(sql)
		console.log(rs)

		for(let {savename} of rs){
			await moveFile(savename)
		}
		res.redirect(`/${req.lang}/board`)
	} 
	catch (err) {
		next(createError(500, err))
	}
})


module.exports = router