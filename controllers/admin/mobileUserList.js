const apiModel = require('../../lib/mysql')

module.exports = async (ctx) => {
  let page, dataLength = '', data
  if (ctx.querystring === '') {
    page = 1
  } else {
    page = ctx.querystring.split('=')[1]
  }
  await apiModel.findData('mobile_users').then(res => {
    dataLength = res.length
  })
  await apiModel.findPageData('mobile_users', page, 15).then(res => {
    data = res
  })
  await ctx.render('mobileUser', {
    session: ctx.session,
    dataLength: Math.ceil(dataLength / 15),
    nowPage: parseInt(page),
    type: 'mobileUser',
    users: data
  })
}