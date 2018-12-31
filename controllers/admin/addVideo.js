const apiModel = require('../../lib/mysql')

module.exports = async (ctx) => {
  let i_body = Object.assign({}, ctx.request.body)
  let {name, release_time, duration, country, classify, star, detail} = i_body['fields']
  let image_file = i_body['files']['file']['path']
  let video_file = i_body['files']['video_file']['path']
  let data = [name, country, classify, release_time, image_file.match(/\w+/g)[2], video_file.match(/\w+/g)[2], star, duration, detail]

  try {
    await apiModel.addVideos(data)
    ctx.state = {
      message: '上传成功'
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      message: '上传失败'
    }
  }
}