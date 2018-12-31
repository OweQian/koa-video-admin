const checkLogin = require('../../middlewares/check').checkLogin
module.exports = async (ctx) => {
  await checkLogin(ctx)
  await ctx.render('upload', {
    session: ctx.session
  })
}