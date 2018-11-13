const Koa = require('koa')
const path = require('path')
const ejs = require('ejs')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
require('env2')('./.env')
const config = require('./config/index')
const Router = require('koa-router')
const views = require('koa-views')
const cors = require('koa-cors')
const logger = require('koa-logger')
const compress = require('koa-compress')
const koaBody = require('koa-body')
const StaticCache = require('koa-static-cache')

const app = new Koa()
const router = new Router()

// 配置存储session信息的mysql
let store = new MysqlStore({
  user: config.DATABASE.USERNAME,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.NAME,
  host: config.DATABASE.HOST
})

app.use(logger())
app.use(cors())

// session
app.use(session({
  key: 'USER_SID',
  store
}))

// 缓存
app.use(StaticCache(path.join(__dirname, './public'), {
  dynamic: true,
  maxAge: 365 * 24 * 60 * 60
}))

app.use(StaticCache(path.join(__dirname, './public/images/avator'), {
  dynamic: true,
  maxAge: 365 * 24 * 60 * 60
}))

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// compress
app.use(compress({threshold: 2048}))

// koa-body
app.use(koaBody({multipart: true, formidable: {uploadDir: path.join(__dirname, './public/images')}}))

app.use(require('./routes/admin').routes()).use(router.allowedMethods)

app.listen(8000)
console.log(`listening on port 8000`)
