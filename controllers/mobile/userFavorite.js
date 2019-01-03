const apiModel = require('../../lib/mysql')
module.exports = async (ctx) => {
  const { userId } = ctx.query
  await Promise.all([
    apiModel.getFavoriteList(0, userId),
    apiModel.getFavoriteList(1, userId)
  ]).then(res => {
      ctx.body = {
        code: 0,
        data: [...res[0], ...res[1]],
        message: '获取数据成功'
      }
    }).catch(err => {
      ctx.body = {
        code: -1,
        message: '获取数据失败'
      }
    })
}