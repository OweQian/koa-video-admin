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
    type: 'mobileUser',
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

// 评论列表
router.get('/comments', async (ctx, next) => {
  await ctx.render('comments', {
    session: {
      user: '王小白'
    },
    dataLength: 5,
    nowPage: 1,
    type: 'comments',
    comments: [{
      id: 1,
      username: 'wangxiaobai',
      date: '2018-11-13',
      content: '可不高峰',
      video_name: '战狼',
      uid: 1
    }, {
      id: 2,
      username: 'wangxiaobai',
      date: '2018-11-13',
      content: '可不高峰',
      video_name: '战狼',
      uid: 2
    }]
  })
})

// 喜欢、不喜欢
router.get('/favorites', async (ctx, next) => {
  await ctx.render('favorites', {
    session: {
      user: '王小白'
    },
    dataLength: 5,
    nowPage: 1,
    type: 'favorites',
    favorites: [{
      id: 1,
      is_favorite: '喜欢',
      username: 'wangxiaobai',
      video_name: '战狼',
      star: '7.8',
      uid: 1
    }, {
      id: 2,
      is_favorite: '喜欢',
      username: 'wangxiaobai',
      video_name: '战狼',
      star: '7.8',
      uid: 1
    }]
  })
})

module.exports = router