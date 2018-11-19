const router = require('koa-router')()
const apiModel = require('../lib/mysql')
const path = require('path')
const fs = require('fs')
const checkLogin = require('../middlewares/check').checkLogin

router.get('/', async (ctx, next) => {
  let data;
  let page;
  let dataLength;
  console.log(ctx.querystring)
  if (ctx.querystring === '') {
    page = 1
  } else {
    page = ctx.querystring.split('=')[1];
  }
  await checkLogin(ctx)
  await apiModel.findData('videos').then(res => {
    dataLength = res.length
  })
  await apiModel.findPageData('videos', page, 7).then(res => {
    data = JSON.parse(JSON.stringify(res))
  })
  await ctx.render('videoList', {
    videos: data,
    session: ctx.session,
    dataLength: Math.ceil(dataLength / 7),
    nowPage: parseInt(page)
  })
})
// 登录视图
router.get('/login', async (ctx, next) => {
  // ctx.router available
  if (ctx.session.user) {
    await ctx.redirect('/')
  } else {
    await ctx.render('login')
  }
})

// 注册、登录
router.post('/login', async (ctx, next) => {
  let {username, password} = ctx.request.body
  console.log(ctx.request.body)
  await apiModel.findUserByName(username)
    .then(res => {
      if (res[0].username === username) {
        ctx.session.user = username
        ctx.session.password = password
      }
    }).catch(() => {
      ctx.session.user = username
      ctx.session.password = password
      apiModel.addUser([username, password])
    })
  await ctx.redirect('/')
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

// 上传video数据
router.post('/upload', async (ctx, next) => {
  let i_body = Object.assign({}, ctx.request.body)
  let {name, release_time, duration, actors, country, classify, star, type, detail} = i_body
  let image = ctx.uploadpath.image
  let data = [name, country, classify, release_time, image, star, duration, type, actors, detail]
  console.log(ctx.uploadpath)
  await apiModel.insertVideo(data).then((res) => {
    console.log(res)
    ctx.body = {
      code: 200,
      message: '上传成功'
    }
  }).catch((res) => {
    console.log(res)
    ctx.body = {
      code: 500,
      message: '上传失败'
    }
  })
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
    }
  })
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