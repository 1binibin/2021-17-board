/*************** global init *****************/
const path = require('path')
const express = require('express')
const app = express()
const methodInit = require('./modules/method-init')


/*************** server init  *****************/
require('dotenv').config()
require('./modules/server-init')(app, process.env.PORT)


/*************** view engine *****************/
app.set('view engine', 'ejs')
app.set('views', './views')
app.locals.pretty = true
app.locals.tabTitle = '노드 게시판'

/*************** Middleware *****************/
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodInit())

/*************** static init *****************/
app.use('/',express.static( path.join(__dirname, 'public') ))
app.use('/uploads', express.static(path.join(__dirname, 'storages')))


/*************** router init *****************/
const langMW = require('./middlewares/lang-mw')
const boardRouter = require('./routes/board')
const apiRouter = require('./routes/api/board')

app.use(langMW)
app.use('/board', boardRouter)
app.use('/api/board', apiRouter)


/*************** error init *****************/
const _404Router = require('./routes/error/404-router')
const _500Router = require('./routes/error/500-router')

app.use(_404Router)
app.use(_500Router)




