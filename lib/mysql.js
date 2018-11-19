const mysql = require('mysql')
const config = require('../config/index')

// 创建数据库池
const pool = mysql.createPool({
  host: config.DATABASE.HOST,
  user: config.DATABASE.USERNAME,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.NAME
})

const query = (sql, val = []) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, val, (err, results) => {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
          connection.release()
        })
      }
    })
  })
}

// 建表
const videos =
  `create table if not exists videos(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    classify VARCHAR(100) NOT NULL,
    release_time VARCHAR(40) NOT NULL,
    image VARCHAR(40),
    star VARCHAR(40) NOT NULL,
    duration VARCHAR(40) NOT NULL,
    type VARCHAR(40) NOT NULL,
    actors VARCHAR(100) NOT NULL,
    detail VARCHAR(10000) NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`

const adminUsers =
  `create table if not exists admin_users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`

const mobileUsers =
  `create table if not exists mobile_users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    avator VARCHAR(100) NOT NULL DEFAULT '',
    time VARCHAR(100) NOT NULL DEFAULT '',
    PRIMARY KEY (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`

const comments =
  `create table if not exists comments(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    date VARCHAR(100) NOT NULL,
    content VARCHAR(100) NOT NULL,
    video_name VARCHAR(100) NOT NULL,
    uid VARCHAR(100),
    avator VARCHAR(100) NOT NULL DEFAULT '',
    PRIMARY KEY (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`

const favorites =
  `create table if not exists favorites(
    id INT NOT NULL AUTO_INCREMENT,
    is_favorite VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    video_name VARCHAR(100) NOT NULL,
    video_image VARCHAR(100),
    star VARCHAR(100) NOT NULL,
    uid VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`

const createTable = (sql) => {
  return query(sql)
}

createTable(videos)
createTable(adminUsers)
createTable(mobileUsers)
createTable(comments)
createTable(favorites)

/***
 *
 * sql语句
 ***/
// 表查询所有数据
let findData = (table) => {
  let _sql = `select * from ${table};`
  return query(_sql)
}
// 分页
let findPageData = (table, page, num) => {
  let _sql = `select * from ${table} limit ${(page - 1) * num}, ${num};`
  return query(_sql)
}
// 添加后台用户
let addUser = (value) => {
  let _sql = `insert into admin_users set username=?,password=?;`
  return query(_sql, value)
}

// 删除后台用户
let deleteUserByName = (name) => {
  let _sql = `delete from admin_users where name="${name}";`
  return query(_sql)
}

// 删除后台用户
let deleteUserById = (id) => {
  let _sql = `delete from admin_users where id="${id}";`
  return query(_sql)
}

// 查找用户
let findUserByName = (name) => {
  let _sql = `select * from admin_users where username="${name}";`
  return query(_sql)
}

// 通过classify查找video
let findVideoByClassify = (classify) => {
  let _sql = `select * from videos where classify="${classify}";`
  return query(_sql)
}

// 通过id查找video
let findVideoById = (id) => {
  let _sql = `select * from videos where id="${id}";`
  return query(_sql)
}

// 增加video数据
let insertVideo = (value) => {
  let _sql = `insert into videos set name=?,country=?,classify=?,release_time=?,image=?,star=?,duration=?,type=?,actors=?,detail=?;`
  return query(_sql, value)
}

// 删除video
let deleteVideoById = (id) => {
  let _sql = `delete from videos where id="${id}";`
  return query(_sql)
}

// 更新video
let updateVideoHasImg = (value) => {
  let _sql = `update videos set name=?,country=?,classify=?,release_time=?,image=?,star=?,duration=?,type=?,actors=?,detail=? where id=?;`
  return query(_sql, value)
}

// 更新video
let updateVideoNoneImg = (value) => {
  let _sql = `update videos set name=?,country=?,classify=?,release_time=?,star=?,duration=?,type=?,actors=?,detail=? where id=?;`
  return query(_sql, value)
}

// 更新喜欢列表
let updateFavirotesVideoImg = (value) => {
  let _sql = `update favorites set video_image=? where uid=?;`
  return query(_sql, value)
}

let updateFavoritesVideoName = (value) => {
  let _sql = `update favorites set video_name=? where uid=?;`
  return query(_sql, value)
}

// 更新评论列表影片名称
let updateCommentsVideoName = (value) => {
  let _sql = `update comments set video_name=? where uid=?;`
  return query(_sql, value)
}

// 手机端相关功能

// 通过用户名查找用户
let findMobileUserByName = (name) => {
  let _sql = `select * from mobile_users where username="${name}";`
  return query(_sql)
}

// 添加用户
let addMobileUser = (value) => {
  let _sql = `insert into mobile_users set username=?, password=?, time=?;`
  return query(_sql, value)
}

// 检测用户登录信息的有效性
let checkUser = (name) => {
  let _sql = `select * from mobile_users where username="${name}";`
  return query(_sql)
}

// 修改用户名
let updateMobileUsername = (value) => {
  let _sql = `update mobile_users set username=? where username=?;`
  return query(_sql, value)
}

let updateMobileCommentUsername = (value) => {
  let _sql = `update comments set username=? where username=?;`
  return query(_sql, value)
}

let updateMobileFavoriteUsername = (value) => {
  let _sql = `update favorites set username=? where username=?;`
  return query(_sql, value)
}

// 添加头像
let updateMobileAvator = (value) => {
  let _sql = `update mobile_users set avator=? where username=?;`
  return query(_sql, value)
}

// 添加头像
let updateMobileCommentAvator = (value) => {
  let _sql = `update comments set avator=? where username=?;`
  return query(_sql, value)
}

// 增加评论
let addComment = (value) => {
  let _sql = `insert into comments set username=?,date=?,content=?,video_name=?,uid=?,avator=?;`
  return query(_sql, value)
}

// 通过id获取评论
let getCommentById = (id) => {
  let _sql = `select * from comments where uid="${id}";`
  return query(_sql)
}
// 通过用户名获取评论
let getCommentByUsername = (name) => {
  let _sql = `select * from comments where username="${name}";`
  return query(_sql)
}
// 删除评论
let deleteComment = (id) => {
  let _sql = `delete from comments where id="${id}";`
  return query(_sql)
}

// 增加favorite
let addFavorite = (value) => {
  let _sql = `insert into favorites set is_favorite=?,username=?,video_name=?,video_image=?,star=?,uid=?;`
  return query(_sql, value)
}

// 获取单个video里的用户的favorite状态
let getFavorite = (name, uid) => {
  let _sql = `select * from favorites where username="${name}" AND uid="${uid}";`
  return query(_sql)
}

// 获取个人中心自己like/dislike的列表
let getFavoriteList = (name, type) => {
  let _sql = `select * from favorites where username='${name}' AND is_favorite='${type}'; `
  return query(_sql)
}
// 获取喜欢的数量
let getFavoriteStar = (type, uid) => {
  let _sql = `select count(*) from favorites where is_favorite='${type}' AND uid='${uid}' ; `
  return query(_sql)
}
// 获取单篇文章like/dislike总的数量
let getUidFavoriteLength = (uid) => {
  let _sql = `select count(*) from favorites where uid='${uid}'; `
  return query(_sql)
}
// 更新videos star分数
let updateVideoStar = (value) => {
  let _sql = `update videos set star=? where id=?; `
  return query(_sql, value)
}
// 更新likes star分数
let updateFavoriteStar = (value) => {
  let _sql = `update favorites set star=? where uid=?; `
  return query(_sql, value)
}

// 搜索
let search = (value) => {
  let _sql = `select * from videos where name like "%${value}%";`
  return query(_sql)
}

module.exports = {
  findData,
  findPageData,
  addUser,
  deleteUserByName,
  deleteUserById,
  findUserByName,
  findVideoByClassify,
  findVideoById,
  insertVideo,
  deleteVideoById,
  updateVideoHasImg,
  updateVideoNoneImg,
  updateFavirotesVideoImg,
  updateFavoritesVideoName,
  updateCommentsVideoName,
  findMobileUserByName,
  addMobileUser,
  checkUser,
  updateMobileUsername,
  updateMobileCommentUsername,
  updateMobileFavoriteUsername,
  updateMobileAvator,
  updateMobileCommentAvator,
  addComment,
  getCommentById,
  getCommentByUsername,
  deleteComment,
  addFavorite,
  getFavorite,
  getFavoriteList,
  getFavoriteStar,
  getUidFavoriteLength,
  updateVideoStar,
  updateFavoriteStar,
  search
}