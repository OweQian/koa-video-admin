const Router = require('koa-router')
const mobile = new Router({
  prefix: '/api'
})
const controllers = require('../controllers')
const config = require('../config/index')

// 存储手机端用户信息
mobile.post('/login', controllers.mobile.login)

// 获取列表数据
mobile.get('/videos', controllers.mobile.videoList)

// 根据id获取video
mobile.get('/video', controllers.mobile.videoDetail)

// 获取某个video的评论
mobile.get('/comments/video', controllers.mobile.videoComments)

// 根据用户id获取评论
mobile.get('/comments/user', controllers.mobile.userComments)

// 评论
mobile.post('/comment', controllers.mobile.addComments)

// 删除评论
mobile.del('/comments',controllers.mobile.deleteComments)

// 点击喜欢
mobile.post('/favorite', controllers.mobile.addFavorite)

// 获取单个video的favorite
mobile.get('/favorites/video', controllers.mobile.videoFavorite)

// 获取个人favorite列表
mobile.get('/favorites/user', controllers.mobile.userFavorite)

// 搜索
mobile.post('/search', controllers.mobile.search)

// 验证码
mobile.get('/code', controllers.mobile.code)

// 新增头像
mobile.post('/upload/avator', controllers.mobile.uploadAvator)

// 获取头像
mobile.get('/avator', controllers.mobile.avator)

// 修改用户名
mobile.post('/username', controllers.mobile.editUsername)

module.exports = mobile