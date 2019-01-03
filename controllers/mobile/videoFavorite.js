const apiModel = require('../../lib/mysql')
module.exports = async (ctx) => {
  const { userId, videoId } = ctx.query
  await apiModel.getFavoriteById(userId, videoId)
    .then(res => {
      ctx.body = {
        code: 0,
        data: res,
        message: '获取数据成功'
      }
    }).catch(err => {
      ctx.body = {
        code: -1,
        message: '获取数据失败'
      }
    })
}