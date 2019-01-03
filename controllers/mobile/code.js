const apiModel = require('../../lib/mysql')
const fs = require('fs')
const captcha = require('trek-captcha')
module.exports = async (ctx) => {
  const {token, buffer} = await captcha({size: 4})
  let getCode = false
  getCode = new Promise((resolve, reject) => {
    fs.createWriteStream('../../public/images/code.jpg').on('finish', data => {
      resolve(true)
    }).end(buffer)
  })
  if (getCode) {
    ctx.body = {
      code: 0,
      data: token,
      message: '获取验证码成功'
    }
  } else {
    ctx.body = {
      code: -1,
      data: token,
      message: '获取验证码失败'
    }
  }
}