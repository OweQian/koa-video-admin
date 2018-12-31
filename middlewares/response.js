/*
 * 响应处理模块
*/

module.exports = async function (ctx, next) {
  try {
    // 调用下一个 middleware
    await next()

    // 处理相应结果
    // 如果直接写入在body中，则不作处理
    // 如果ctx.body为空，则使用 state 作为响应
    ctx.body = ctx.body ? ctx.body : {
      code: ctx.state.code !== undefined ? ctx.state.code : 0,
      message: ctx.state.message !== undefined ? ctx.state.message : 'unknow'
    }
  } catch (e) {

    // 设置状态码为 200 - 服务端错误
    ctx.status = 200

    // 输出详细的错误信息
    ctx.body= {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
}