const apiModel = require('../../lib/mysql')
const checkToken = require('../../middlewares/check').checkToken
module.exports = async (ctx) => {
  let {favorite, videoId} = ctx.request.body
  let newStar
  await checkToken(ctx).then(async res => {
    await apiModel.addFavorite([favorite, res.data, videoId])
    // 修改评分
    await Promise.all([
      apiModel.getFavoriteCountByType(1, videoId),
      apiModel.getFavoriteCount(videoId)
    ]).then(async res => {
      newStar = (res[0][0]['count(*)'] / res[1][0]['count(*)'] * 10).toFixed(1)
    })
    await apiModel.updateVideoStar([newStar, videoId])
      .then(res => {
      ctx.body = {
        code: 0,
        message: '评分成功'
      }
    }).catch(err => {
      ctx.body = {
        code: -1,
        message: '评分成功'
      }
    })
  }).catch(err => {
    ctx.body = err
  })
}