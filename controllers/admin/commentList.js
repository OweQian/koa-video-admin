const apiModel = require('../../lib/mysql')
module.exports = async (ctx) => {
  let page, dataLength = '', data
  if (ctx.querystring === '') {
    page = 1
  } else {
    page = ctx.querystring.split('=')[1]
  }
  await apiModel.findData('comments').then(res => {
    dataLength = res.length
  })
  await apiModel.getComment(page, 15).then(res => {
    data = res
    console.log(res)
  })
  await ctx.render('comments', {
    session: ctx.session,
    dataLength: Math.ceil(dataLength / 15),
    nowPage: parseInt(page),
    type: 'comments',
    comments: data
  })
}