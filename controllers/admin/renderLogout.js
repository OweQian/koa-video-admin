module.exports = async (ctx) => {
  ctx.session = null
  await ctx.redirect('/login')
}