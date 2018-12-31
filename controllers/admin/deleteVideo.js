const apiModel = require('../../lib/mysql')
module.exports = async (ctx) => {
  let { id } = ctx.request.query
  await apiModel.deleteVideoById(id)
    .then(res => {
    ctx.state = {
      message: '删除成功'
    }
  }).catch((res) => {
    ctx.state = {
      code: -1,
      message: '删除失败'
    }
  })
}