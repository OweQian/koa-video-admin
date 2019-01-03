const apiModel = require('../../lib/mysql')
const checkToken = require('../../middlewares/check').checkToken
const moment = require('moment')
module.exports = async (ctx) => {
  let {userId, content, videoId} = ctx.request.body
  let date = moment().format('YYYY-MM-DD HH:mm:ss')
  await checkToken(ctx).then(async res => {
    await apiModel.addComment([res.data, date, content, videoId])
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
}