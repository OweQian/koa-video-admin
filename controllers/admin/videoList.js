const apiModel = require('../../lib/mysql')
const checkLogin = require('../../middlewares/check').checkLogin
module.exports = async (ctx) => {
  let data
  let page
  let dataLength
  if (ctx.querystring === '') {
    page = 1
  } else {
    page = ctx.querystring.split('=')[1]
  }
  await checkLogin(ctx)
  await apiModel.findData('videos').then(res => {
    dataLength = res.length
  })
  await apiModel.findPageData('videos', page, 5).then(res => {
    data = JSON.parse(JSON.stringify(res))
  })
  await ctx.render('videoList', {
    videos: data,
    session: ctx.session,
    type: 'videoList',
    dataLength: Math.ceil(dataLength / 15),
    nowPage: parseInt(page)
  })
}