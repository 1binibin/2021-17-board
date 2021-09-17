const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { error, moveFile } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const uploader = require('../../middlewares/multer-mw')

router.post('/',uploader.single('upfile'), async (req, res, next) => {
	let sql, values; 
	try {
		const { title, writer, content, _method, id } = req.body
		
		const isUpdate = (_method === 'PUT' && id)
		sql = isUpdate ? " UPDATE boards " : " INSERT INTO boards "
		sql += " SET title=?, writer=?, content=? "
		sql += isUpdate ? " WHERE id= " + id : ""
		values = [ title, writer, content ]
		const [rs] = await pool.execute(sql, values)
		
		if(req.file){
			const {originalname, filename, mimetype, size} = req.file
			if(isUpdate) {
				sql = " SELECT id, savename FROM files WHERE fid=? AND status=?  "
				values = [Number(id), '1']
				let [rsf] = await pool.execute(sql, values)
				if(rsf.length > 0) {
					sql = " UPDATE files SET status = '0' WHERE id = " + rsf[0].id
					await pool.execute(sql)
					await moveFile(rsf[0].savename)
				}
			}
			sql = " INSERT INTO files SET  realname=?, savename=?, mimetype=?, size=?, fid=?"
			values = [ originalname, filename, mimetype,  size, (isUpdate ? id : rs.insertId) ]
			await pool.execute(sql, values)
		}
		res.redirect(`/${req.lang}/board`)
	} 
	catch (err) {
		next(createError(500, err))
	}
})


module.exports = router