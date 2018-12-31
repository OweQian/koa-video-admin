module.exports = async (ctx) => {
  if (ctx.session.user) {
    await ctx.redirect('/')
  } else {
    await ctx.render('login')
  }
}