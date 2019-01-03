let apiModel = require('../lib/mysql')
let md5 = require('md5')
let jwt = require('jsonwebtoken')
let config = require('../config/index')

module.exports = {
  // 检查是否登录
  checkLogin: (ctx) => {
    if (!ctx.session || !ctx.session.user) {
      ctx.redirect('/login')
    }
  },
  checkToken: async ctx => {
    let token = ctx.get('token')
    return new Promise(async (resolve, reject) => {
      // 解析token
      jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
        if (err) {
          if (err.message === 'jwt expired') {
            reject({
              code: 401,
              message: '用户权限过期'
            })
          } else {
            reject({
              code: 401,
              message: '无效的用户权限，请重新登录'
            })
          }
        } else {
          let res = await apiModel.findMobileUserById(decoded.userId)
          if (res) {
            resolve({
              code: 200,
              data: decoded.userId,
              message: '验证成功'
            })
          } else {
            reject({
              code: 401,
              message: '用户身份不一致'
            })
          }
        }
      })
    })
  }
}