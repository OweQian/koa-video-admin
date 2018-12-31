const apiModel = require('../../lib/mysql')

module.exports = async (ctx) => {
  let {username, password} = ctx.request.body
  await apiModel.findAdminUserByName(username)
    .then(res => {
      if (res[0].username === username) {
        ctx.session.user = username
        ctx.session.password = password
      }
    }).catch(() => {
      ctx.session.user = username
      ctx.session.password = password
      apiModel.addAdminUser([username, password])
    })
  await ctx.redirect('/')
}