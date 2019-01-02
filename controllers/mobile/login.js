const apiModel = require('../../lib/mysql')
const jwt = require('jsonwebtoken')
const config = require('../../config/index')
const moment = require('moment')
module.exports = async (ctx) => {
  let data = ctx.request.body
  data = typeof data === 'string' ? JSON.parse(data) : data
  let {username: name, password: pass} = data
  let token = jwt.sign({
    username: name
  }, config.JWT_SECRET, {
    expiresIn: '30 days'
  })

  await apiModel.findMobileUserByName(name)
    .then(res => {
      if (res[0].username === name && res[0].password === pass) {
        ctx.body = {
          code: 0,
          avator: res[0].avator,
          token,
          message: '登录成功'
        }
      } else {
        ctx.body = {
          code: -1,
          message: '用户名或密码错误'
        }
      }
    }).catch(() => {
      ctx.body = {
        code: 0,
        message: '注册成功',
        token
      }
      apiModel.addMobileUser([name, pass, moment().format('YYYY-MM-DD HH:mm:ss')])
    })
}