const apiModel = require('../../lib/mysql')
module.exports = async (ctx) => {
  await apiModel.findData('videos').then(res => {
    ctx.body = {
      code: 0,
      data: {
        data: res
      },
      message: '获取数据成功'
    }
  }).catch(err => {
    ctx.body = {
      code: -1,
      message: '获取数据失败'
    }
  })
}