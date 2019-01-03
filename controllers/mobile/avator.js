const apiModel = require('../../lib/mysql')
module.exports = async (ctx) => {
  let { id } = ctx.request.body
  await apiModel.findMobileUserByName(id)
    .then(res => {
      if (res.length >=1 ) {
        ctx.body = {
          code: 0,
          avator: Object.assign({}, res[0]).avator,
          message: '获取头像成功'
        }
      } else {
        ctx.body = {
          code: -1,
          message: '暂未上传头像'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: -1,
        message: '获取头像失败'
      }
    })
}