const router = require('koa-router')({
  preffix: '/admin'
})

const controllers = require('../controllers')

// 登录视图
router.get('/login', controllers.admin.renderLogin)

// 退出
router.get('/logout', controllers.admin.renderLogout)

// 上传video数据视图
router.get('/upload', controllers.admin.renderAddVideo)

// edit video get
router.get('/edit/:id', controllers.admin.renderEditVideo)

router.get('/', controllers.admin.videoList)

// 注册、登录
router.post('/login', controllers.admin.login)

// 上传video数据
router.post('/upload', controllers.admin.addVideo)

// edit video
router.post('/edit/:id', controllers.admin.editVideo)

// video 删除
router.delete('/delete', controllers.admin.deleteVideo)
// 管理员列表
router.get('/adminUser', controllers.admin.adminUserList)

// 手机用户列表
router.get('/mobileUser', controllers.admin.mobileUserList)

// 评论列表
router.get('/comments', controllers.admin.commentList)

// 喜欢、不喜欢
router.get('/favorites', controllers.admin.favoriteList)

module.exports = router