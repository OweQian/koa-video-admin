const apiModel = require('../../lib/mysql')
const checkToken = require('../../middlewares/check').checkToken

module.exports = async (ctx) => {
  const { newUsername } = ctx.request.body
  let userExist = false
  let userId
  await checkToken(ctx).then(async res => {
    userId = res.userId
    await apiModel.findMobileUserById(userId)
      .then(res => {
        if (res.length) {
          userExist = true
        } else {
          userExist = false
        }
      })
    if (!userExist) {
      await apiModel.updateMobileUserById([newUsername, userId])
        .then(res => {
          ctx.body = {
            code: 0,
            message: '修改成功'
          }
        }).catch(err => {
          ctx.body = {
            code: -1,
            message: '修改失败'
          }
        })
    } else {
      ctx.body = {
        code: -1,
        message: '用户不存在'
      }
    }
  }).catch(err => {
    ctx.b = err
  })
}