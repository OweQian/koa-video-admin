const apiModel = require('../../lib/mysql')
module.exports = async (ctx) => {
  const val = ctx.request.body
  await apiModel.search(val)
    .then(res => {
      ctx.body = {
        code: 0,
        data: res,
        message: '获取搜索结果成功',
        total: res.length
      }
    })
}