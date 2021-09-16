const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const listRouter = require('./list-router')
const viewRouter = require('./view-router')
const writeRouter = require('./write-router')
const saveRouter = require('./save-router')
const deleteRouter = require('./delete-router')

router.post('/', saveRouter)					// save
router.delete('/',deleteRouter)
router.use('/write', writeRouter)		// 글작성(수정)
router.use('/view', viewRouter)			// 상세페이지
router.use('/', listRouter)					// 리스트

module.exports = router

/* 
- list         : GET  	| /board/list, /board/list/페이지
- view         : GET  	| /board/view/<idx>
- write        : POST 	| /board/
- update       : POST 	| /board/<idx>
- delete			 : DELETE | /board/<idx>
- file download: GET 		| /board/download/<idx>
- comment save : POST 	| /board/comment
 */