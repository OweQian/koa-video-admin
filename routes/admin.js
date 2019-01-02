const Router = require('koa-router')
const admin = new Router({
  prefix: '/admin'
})


const controllers = require('../controllers')

// 登录视图
admin.get('/login', controllers.admin.renderLogin)

// 退出
admin.get('/logout', controllers.admin.renderLogout)

// 上传video数据视图
admin.get('/upload', controllers.admin.renderAddVideo)

// edit video get
admin.get('/edit/:id', controllers.admin.renderEditVideo)

admin.get('/', controllers.admin.videoList)

// 注册、登录
admin.post('/login', controllers.admin.login)

// 上传video数据
admin.post('/upload', controllers.admin.addVideo)

// edit video
admin.post('/edit/:id', controllers.admin.editVideo)

// video 删除
admin.delete('/delete', controllers.admin.deleteVideo)
// 管理员列表
admin.get('/adminUser', controllers.admin.adminUserList)

// 手机用户列表
admin.get('/mobileUser', controllers.admin.mobileUserList)

// 评论列表
admin.get('/comments', controllers.admin.commentList)

// 喜欢、不喜欢
admin.get('/favorites', controllers.admin.favoriteList)

module.exports = admin