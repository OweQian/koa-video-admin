const router = require('koa-router')()
const apiModel = require('../lib/mysql')
const path = require('path')
const fs = require('fs')
const checkLogin = require('../middlewares/check').checkLogin

router.get('/', async (ctx, next) => {
  let data
  let page
  let dataLength
  if (ctx.querystring === '') {
    page = 1
  } else {
    page = ctx.querystring.split('=')[1]
  }
  await checkLogin(ctx)
  await apiModel.findData('videos').then(res => {
    dataLength = res.length
  })
  await apiModel.findPageData('videos', page, 15).then(res => {
    data = JSON.parse(JSON.stringify(res))
    console.log(res)
  })
  await ctx.render('videoList', {
    videos: data,
    session: ctx.session,
    type: 'videoList',
    dataLength: Math.ceil(dataLength / 15),
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
  console.log(i_body)
  let {name, release_time, duration, actors, country, classify, star, type, detail} = i_body['fields']
  let image = i_body['files']['file']['path']
  let data = [name, country, classify, release_time, image.match(/\w+/g)[2], star, duration, type, actors, detail]
  console.log(data)
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

// edit video post
router.post('/edit/:id', async (ctx, next) => {
  let i_body = Object.assign({}, ctx.request.body)
  let {name, release_time, duration, actors, country, classify, star, file, type, detail} = i_body['fields']
  let image = ''
  if (Object.keys(i_body['files']).length === 0) {
    image = file
  } else {
    image = i_body['files']['newFile']['path'].match(/\w+/g)[2]
  }
  let data = [name, country, classify, release_time, image, star, duration, type, actors, detail, ctx.params.id]
  await Promise.all([
    apiModel.updateFavoritesVideoName([name, ctx.params.id]),
    apiModel.updateCommentsVideoName([name, ctx.params.id]),
    apiModel.updateVideoHasImg(data),
    apiModel.updateFavirotesVideoImg([image, ctx.params.id])
  ]).then(res => {
    console.log(res)
    ctx.body = {
      code: 200,
      message: '修改成功'
    }
  }).catch((res) => {
    console.log(res)
    ctx.body = {
      code: 500,
      message: '修改失败'
    }
  })
})

// video 删除
router.post('/delete/:id', async (ctx, next) => {
  await apiModel.deleteVideoById(ctx.params.id).then(res => {
    console.log(res)
    ctx.body = {
      code: 200,
      message: '删除成功'
    }
  }).catch((res) => {
    console.log(res)
    ctx.body = {
      code: 500,
      message: '删除失败'
    }
  })
})
// 管理员列表
router.get('/adminUser', async (ctx, next) => {
  let page, dataLength = '', data
  if (ctx.querystring === '') {
    page = 1
  } else {
    page = ctx.querystring.split('=')[1]
  }
  await apiModel.findData('admin_users').then(res => {
    dataLength = res.length
  })
  await apiModel.findPageData('admin_users', page, 15).then(res => {
    data = res
  })
  await ctx.render('adminUser', {
    session: ctx.session,
    dataLength: Math.ceil(dataLength / 15),
    nowPage: parseInt(page),
    type: 'adminUser',
    users: data
  })
})

// 手机用户列表
router.get('/mobileUser', async (ctx, next) => {
  let page, dataLength = '', data
  if (ctx.querystring === '') {
    page = 1
  } else {
    page = ctx.querystring.split('=')[1]
  }
  await apiModel.findData('mobile_users').then(res => {
    dataLength = res.length
  })
  await apiModel.findPageData('mobile_users', page, 15).then(res => {
    data = res
  })
  await ctx.render('mobileUser', {
    session: ctx.session,
    dataLength: Math.ceil(dataLength / 15),
    nowPage: parseInt(page),
    type: 'mobileUser',
    users: data
  })
})

// 评论列表
router.get('/comments', async (ctx, next) => {
  let page, dataLength = '', data
  if (ctx.querystring === '') {
    page = 1
  } else {
    page = ctx.querystring.split('=')[1]
  }
  await apiModel.findData('comments').then(res => {
    dataLength = res.length
  })
  await apiModel.findPageData('comments', page, 15).then(res => {
    data = res
  })
  await ctx.render('comments', {
    session: ctx.session,
    dataLength: Math.ceil(dataLength / 15),
    nowPage: parseInt(page),
    type: 'comments',
    comments: data
  })
})

// 喜欢、不喜欢
router.get('/favorites', async (ctx, next) => {
  let page, dataLength = '', data
  if (ctx.querystring === '') {
    page = 1
  } else {
    page = ctx.querystring.split('=')[1]
  }
  await apiModel.findData('favorites').then(res => {
    dataLength = res.length
  })
  await apiModel.findPageData('favorites', page, 15).then(res => {
    data = res
  })
  await ctx.render('favorites', {
    session: ctx.session,
    dataLength: Math.ceil(dataLength / 15),
    nowPage: parseInt(page),
    type: 'favorites',
    favorites: data
  })
})

module.exports = router