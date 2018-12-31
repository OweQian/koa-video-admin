const apiModel = require('../../lib/mysql')

module.exports = async (ctx) => {
  let data
  await apiModel.findVideoById(ctx.params.id).then(res => {
    data = JSON.parse(JSON.stringify(res))
  })
  await ctx.render('edit', {
    session: ctx.session,
    video: data[0]
  })
}