const apiModel = require('../../lib/mysql')
const jwt = require('jsonwebtoken')
const config = require('../../config/index')
const moment = require('moment')
module.exports = async (ctx) => {
  let data = ctx.request.body
  data = typeof data === 'string' ? JSON.parse(data) : data
  let {username: name, password: pass} = data
  try {
    let result = await apiModel.findMobileUserByName(name)
    if (result[0].username === name && result[0].password === pass) {
      ctx.body = {
        code: 0,
        avator: result[0].avator,
        token: signJWT(result[0].id),
        message: '登录成功'
      }
    } else {
      ctx.body = {
        code: -1,
        message: '用户名或密码错误'
      }
    }
  } catch (e) {
    await apiModel.addMobileUser([name, pass, moment().format('YYYY-MM-DD HH:mm:ss')])
    let res = await apiModel.findMobileUserByName(name)
    ctx.body = {
      code: 0,
      message: '注册成功',
      token: signJWT(res[0].id)
    }
  }
}

function signJWT (id) {
  return jwt.sign({
    userId: id
  }, config.JWT_SECRET, {
    expiresIn: '30 days'
  })
}