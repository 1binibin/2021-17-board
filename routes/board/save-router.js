const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const uploader = require('../../middlewares/multer-mw')

router.post('/',uploader.single('upfile'), async (req, res, next) => {
	let sql, values;
	try {
		const { title, writer, content, _method, id } = req.body
		sql = " INSERT INTO boards SET title=?, writer=?, content=? "
		values = [ title, writer, content ]
		const [rs] = await pool.execute(sql, values)
		
		if(req.file){
		const {originalname, mimetype, filename, size} = req.file
		sql = " INSERT INTO files SET  realname=?, savename=?, mimetype=?, size=?, fid=?"
		values = [ originalname, filename, mimetype,  size, rs.insertId ]
		await pool.execute(sql, values)
		}
		res.redirect(`/${req.lang}/board`)
	} 
	catch (err) {
		next(createError(500, err))
	}
})


module.exports = router