const apiModel = require('../../lib/mysql')

module.exports = async (ctx) => {
  let page, dataLength = '', data
  if (ctx.querystring === '') {
    page = 1
  } else {
    page = ctx.querystring.split('=')[1]
  }
  await apiModel.findData('admin_users').then(res => {
    dataLength = res.length
  })
  await apiModel.findPageData('admin_users', page, 15).then(res => {
    data = res
  })
  await ctx.render('adminUser', {
    session: ctx.session,
    dataLength: Math.ceil(dataLength / 15),
    nowPage: parseInt(page),
    type: 'adminUser',
    users: data
  })
}