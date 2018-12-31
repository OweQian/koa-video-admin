const apiModel = require('../../lib/mysql')

module.exports = async (ctx) => {
  let i_body = Object.assign({}, ctx.request.body)
  let {name, release_time, duration, country, classify, star, image_path, video_path, detail} = i_body['fields']
  let image_file = ''
  let video_file = ''
  if (i_body['files']['newFile']) {
    image_file = i_body['files']['newFile']['path']
    image_file = image_file.match(/\w+/g)[2]
  } else {
    image_file = image_path
  }
  if (i_body['files']['newVideoFile']) {
    video_file = i_body['files']['newVideoFile']['path']
    video_file = video_file.match(/\w+/g)[2]
  } else {
    video_file = video_path
  }
  let data = [name, country, classify, release_time, image_file, video_file, star, duration, detail, ctx.params.id]
  try {
    apiModel.updateVideo(data)
    ctx.state = {
      message: '修改成功'
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      message: '修改失败'
    }
  }
}