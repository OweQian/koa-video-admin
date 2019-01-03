const apiModel = require('../../lib/mysql')
module.exports = async (ctx) => {
  let { userid } = ctx.query
  await apiModel.getCommentByUserId(userid)
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
}