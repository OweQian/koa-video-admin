const router = require('koa-router')({
  preffix: '/admin'
})

const controllers = require('../controllers')
const apiModel = require('../lib/mysql')
const path = require('path')
const fs = require('fs')
const checkLogin = require('../middlewares/check').checkLogin

// 登录视图
router.get('/login', async (ctx, next) => {
  if (ctx.session.user) {
    await ctx.redirect('/')
  } else {
    await ctx.render('login')
  }
})

// 退出
router.get('/logout', async (ctx, next) => {
  ctx.session = null
  await ctx.redirect('/login')
})

// 上传video数据视图
router.get('/upload', async (ctx, next) => {
  await checkLogin(ctx)
  await ctx.render('upload', {
    session: ctx.session
  })
})

// edit video get
router.get('/edit/:id', async (ctx, next) => {
  let data
  await apiModel.findVideoById(ctx.params.id).then(res => {
    data = JSON.parse(JSON.stringify(res))
  })
  await ctx.render('edit', {
    session: ctx.session,
    video: data[0]
  })
})

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