const Router = require('koa-router')
const mobile = new Router({
  prefix: '/api'
})

const controllers = require('../controllers')
const apiModel = require('../lib/mysql')
const path = require('path')
const fs = require('fs')
const moment = require('moment')
const md5 = require('md5')
const checkToken = require('../middlewares/check').checkToken
const config = require('../config/index')

// 存储手机端用户信息
mobile.post('/login', controllers.mobile.login)

// 获取列表数据
mobile.get('/list', controllers.mobile.videoList)

// 根据id获取video
mobile.get('/vi/list/:id', async (ctx) => {
  let {id} = ctx.params
  await Promise.all([
    apiModel.findVideoById(id),
    apiModel.getFavoriteStar(1, id),
    apiModel.getUidFavoriteLength(id)
  ]).then(res => {
    ctx.body = {
      code: 0,
      message: '获取数据成功',
      data: res
    }
  }).catch(err => {
    ctx.body = {
      code: -1,
      message: '获取数据失败'
    }
  })
})

// 获取评论
mobile.get('/vi/comments/:id', async (ctx) => {
  let {id} = ctx.params
  apiModel.getCommentById(id)
    .then(res => {
      ctx.body = {
        code: 0,
        message: '获取数据成功',
        data: res
      }
    }).catch(err => {
    ctx.body = {
      code: -1,
      message: '获取数据失败'
    }
  })
})

// 根据用户名获取评论
mobile.get('/vi/comments/:name', async (ctx) => {
  let {username: name} = ctx.params
  apiModel.getCommentByUsername(name)
    .then(res => {
      ctx.body = {
        code: 0,
        message: '获取数据成功',
        data: res
      }
    }).catch(err => {
    ctx.body = {
      code: -1,
      message: '获取数据失败'
    }
  })
})

// 评论
mobile.post('/vi/comments', async (ctx) => {
  let {username, content, videoName, videoId, avator} = ctx.request.body
  let date = moment().format('YYYY-MM-DD HH:mm:ss')
  await checkToken(ctx).then(async res => {
    await apiModel.addComment([username, date, content, videoName, videoId, avator])
      .then(res => {
        ctx.body = {
          code: 0,
          message: '评论成功'
        }
      }).catch(err => {
        ctx.body = {
          code: -1,
          message: '评论失败'
        }
      })
  }).catch(err => {
    ctx.body = err
  })
})

// 删除评论
mobile.del('/vi/comments/:id', async (ctx) => {
  let {id} = ctx.params
  await checkToken(ctx).then(async res => {
    await apiModel.deleteComment(id)
      .then(res => {
        ctx.body = {
          code: 0,
          message: '删除成功'
        }
      }).catch(err => {
        ctx.body = {
          code: -1,
          message: '删除失败'
        }
      })
  }).catch(err => {
    ctx.body = err
  })
})

// 点击喜欢
mobile.post('/vi/favorite', async (ctx) => {
  let {favorite, username, videoName, videoImage, videoId, star} = ctx.request.body
  let newStar
  await checkToken(ctx).then(async res => {
    await apiModel.addFavorite([favorite, username, videoName, videoImage, star, videoId])
    // 修改评分
    await Promise.all([
      apiModel.getFavoriteStar(1, videoId),
      apiModel.getUidFavoriteLength(videoId)
    ]).then(async res => {
      newStar = (res[0][0]['count(*)'] / res[1][0]['count(*)'] * 10).toFixed(1)
    })
    await Promise.all([
      apiModel.updateFavoriteStar([newStar, videoId]),
      apiModel.updateVideoStar([newStar, videoId])
    ]).then(res => {
      ctx.body = {
        code: 0,
        message: '评分成功'
      }
    }).catch(err => {
      ctx.body = {
        code: -1,
        message: '评分成功'
      }
    })
  }).catch(err => {
    ctx.body = err
  })
})

// 获取单个video的favorite
mobile.get('/vi/favorite', async (ctx) => {
  let {userid, videoid} = ctx.request.query
  await apiModel.getFavorite()
})
module.exports = mobile