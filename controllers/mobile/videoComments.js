const apiModel = require('../../lib/mysql')
module.exports = async (ctx) => {
  console.log(ctx.query)
  let {videoid} = ctx.query
  await apiModel.getCommentByVideoId(videoid)
    .then(res => {
      console.log(res)
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