const Koa = require('koa')
const path = require('path')
const ejs = require('ejs')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const config = require('./config/index.js')
const Router = require('koa-router')
const views = require('koa-views')
const cors = require('koa-cors')
const logger = require('koa-logger')
const compress = require('koa-compress')
const koaBody = require('koa-body')
const StaticCache = require('koa-static-cache')

const app = new Koa()
const route = new Router()

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
const getUploadFileExt = require('./utils/getUploadFileExt');
const getUploadFileName = require('./utils/getUploadFileName');
const checkDirExist = require('./utils/checkDirExist');
const getUploadDirName = require('./utils/getUploadDirName');

app.use(koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      uploadDir: path.join(__dirname, './public/upload'), // 设置文件上传目录
      keepExtensions: true, // 保持文件后缀名
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => {
        // console.log(file);
        // 获取文件后缀
        const ext = getUploadFileExt(file.name);
        // 最终要保存到的文件夹目录
        const dirName = getUploadDirName();
        const dir = path.join(__dirname, `public/upload/${dirName}`);
        // 检查文件夹是否存在如果不存在则新建文件夹
        checkDirExist(dir);
        // 获取文件名称
        const fileName = getUploadFileName(ext);
        // 重新覆盖 file.path 属性
        file.path = `${dir}/${fileName}`;
        app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
        app.context.uploadpath[name] = `${dirName}/${fileName}`;
      }
    }
  }
))

app.use(require('./routes/admin').routes()).use(route.allowedMethods())

app.listen(3000)
console.log(`listening on port 3000`)
