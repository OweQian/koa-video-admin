# 写在前面（该项目参考了wclimb大佬的video-admin，在此表示感谢）

> 项目仓库地址 https://github.com/wangqian2017/koa-video-admin
> 线上预览地址 http://39.107.239.100:3000

## 技术栈

- Koa2
- Mysql

## 开发环境

- Nodejs `v11.2.0`
- Koa `v2.3.0`
- Mysql `v5.7.0`

> 如果遇到报错，可能是因为不支持async await,请先升级node版本，

## 运行

```
git clone https://github.com/wangqian2017/koa-video-admin.git

cd koa-video-admin

npm install  建议使用淘宝镜像(https://npm.taobao.org/) =>  cnpm i

npm i supervisor -g(安装过可以忽略)

npm run dev (运行项目)

npm test (测试)

ps: 需要先创建数据库，本项目的数据库名为 'koa'
```

> 如果觉得对你有帮助还望关注一下，有问题可以及时提哟，觉得不错的话star一下哟

## 管理后台功能

- [x] 注册
- [x] 登录
- [x] 登出
- [x] 上传video信息
- [x] 修改已上传的video信息
- [x] 查看喜欢/不喜欢的所有数据
- [x] 查看评论的所有数据
- [x] 查看后台所有用户
- [x] 查看前台所有用户

## 前台用户功能

* 注册登录登出 + 验证码 密码检测，如果用户不存在则自动创建
* 检测是否登录，如果没有登录则不允许评论和评价
* 可以上传video到后台，进行前台展示
* 评分功能，初始化评分可以自由设置，如果没有人like则默认显示原始评分，如果有则计算当前video的评分
* 修改用户名，检测用户名是否跟其他人重复
* 上传头像，默认没有头像
* 评论功能，评论之后可以在个人中心展示，并且可以删除
* 搜索功能，可以搜索存在的影片，如果没有则显示无结果
* 自己喜欢的video和评论的内容会在个人中心显示

综上：

- [x] 注册
- [x] 登录
- [x] 登出
- [x] 验证码
- [x] 详情页
- [x] 分类
- [x] video列表
- [x] 修改用户名
- [x] 上传头像
- [x] 评论
- [x] 删除评论
- [x] 搜索
- [x] 个人中心数据