const router = require('koa-router')()

// 登录
router.get('/login', async (ctx, next) => {
  // ctx.router available
  await ctx.render('login')
})

// 列表
router.get('/list', async (ctx, next) => {
  // ctx.router available
  await ctx.render('videoList', {
    session: {
      user: '王小白'
    },
    dataLength: 5,
    nowPage: 1,
    type: 'list',
    videos: [{
      name: '战狼',
      country: '中国',
      classify: '电影',
      release_time: '2018-11-12',
      image: '',
      star: '8',
      duration: '350',
      type: '1',
      actors: '武警',
      detail: '巴拉芭芭拉'
    }, {
      name: '战狼',
      country: '中国',
      classify: '电影',
      release_time: '2018-11-12',
      image: '',
      star: '8',
      duration: '350',
      type: '1',
      actors: '武警',
      detail: '巴拉芭芭拉'
    }]
  })
})

// 上传数据
router.get('/upload', async (ctx, next) => {
  await ctx.render('upload', {
    session: {
      user: '王小白'
    }})
})

// 管理员列表
router.get('/adminUser', async (ctx, next) => {
  await ctx.render('adminUser', {
    session: {
      user: '王小白'
    },
    dataLength: 5,
    nowPage: 1,
    type: 'adminUser',
    users: [{
      id: 1,
      username: 'wangxiaobai'
    }, {
      id: 2,
      username: 'wangxiaobai'
    }]
  })
})

// 手机用户列表
router.get('/mobileUser', async (ctx, next) => {
  await ctx.render('mobileUser', {
    session: {
      user: '王小白'
    },
    dataLength: 5,
    nowPage: 1,
    type: 'adminUser',
    users: [{
      id: 1,
      username: 'wangxiaobai',
      avator: ''
    }, {
      id: 2,
      username: 'wangxiaobai',
      avator: ''
    }]
  })
})

module.exports = router