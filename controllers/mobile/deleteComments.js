const apiModel = require('../../lib/mysql')
const checkToken = require('../../middlewares/check').checkToken
module.exports = async (ctx) => {
  let {id} = ctx.query
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
}