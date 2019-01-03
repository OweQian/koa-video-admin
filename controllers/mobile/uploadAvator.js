const apiModel = require('../../lib/mysql')
const checkToken = require('../../middlewares/check').checkToken
module.exports = async (ctx) => {
  const {avator} = ctx.request.body
  const base64Data = avator.replace(/^data:image\/\w+;base64,/, '')
  const dataBuffer = new Buffer(base64Data, 'base64')
  const imgName = Number(Math.random().toString().substr(3)).toString(36) + Date.now()
  await checkToken(ctx).then(async res => {
    let uploadDone = await new Promise((resolve, reject) => {
      fs.writeFile('../../public/images/avator/' + imgName + '.png', dataBuffer, err => {
        if (err) {
          reject(false)
        }
        resolve(true)
      })
    })
    if (uploadDone) {
      await apiModel.updateMobileUserAvatorById([imgName, res.userId])
        .then(res => {
          ctx.body = {
            code: 1,
            avator: imgName,
            message: '上传成功'
          }
        }).catch(err => {
          ctx.body = {
            code: -1,
            message: '上传失败'
          }
        })
    }
  })

}