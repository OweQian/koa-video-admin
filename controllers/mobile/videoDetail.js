const apiModel = require('../../lib/mysql')
module.exports = async (ctx) => {
  let { id } = ctx.query
  await apiModel.findVideoById(id).then(res => {
    ctx.body = {
      code: 0,
      message: '获取数据成功',
      data: res[0]
    }
  }).catch(err => {
    ctx.body = {
      code: -1,
      message: '获取数据失败'
    }
  })
}