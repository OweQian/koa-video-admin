const apiModel = require('../../lib/mysql')
module.exports = async (ctx) => {
  let page, dataLength = '', data
  if (ctx.querystring === '') {
    page = 1
  } else {
    page = ctx.querystring.split('=')[1]
  }
  await apiModel.findData('favorites').then(res => {
    dataLength = res.length
  })
  await apiModel.getFavorite(page, 15).then(res => {
    data = res
  })
  await ctx.render('favorites', {
    session: ctx.session,
    dataLength: Math.ceil(dataLength / 15),
    nowPage: parseInt(page),
    type: 'favorites',
    favorites: data
  })
}