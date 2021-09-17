const path = require('path')
const express = require('express')
const router = express.Router()
const {  moveFile } = require('../../../modules/util')
const { pool } = require('../../../modules/mysql-init')

router.delete('/:id', async (req, res, next) => {
	try {
		sql = "UPDATE files SET status='0' WHERE fid = " + req.params.id
		await pool.execute(sql)
	
		sql = "SELECT savename FROM files WHERE fid = " + req.params.id
		const [rs] = await pool.execute(sql)
		console.log(rs)
			await moveFile(rs.savename)
	
		res.status(200).json({ code: 200, result: 'success' })
	}
	catch(err) {
		res.status(500).json(err)
	}	
})


module.exports = router