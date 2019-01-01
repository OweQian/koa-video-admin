/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : koa

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
 */

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

// tables
const videos =
  `create table if not exists videos(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    classify VARCHAR(100) NOT NULL,
    release_time VARCHAR(40) NOT NULL,
    image_path VARCHAR(40),
    video_path VARCHAR(40),
    star VARCHAR(40) NOT NULL,
    duration VARCHAR(40) NOT NULL,
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
    date VARCHAR(100) NOT NULL DEFAULT '',
    PRIMARY KEY (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`

const comments =
  `create table if not exists comments(
    id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(100) NOT NULL,
    date VARCHAR(100) NOT NULL,
    content VARCHAR(100) NOT NULL,
    video_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`

const favorites =
  `create table if not exists favorites(
    id INT NOT NULL AUTO_INCREMENT,
    is_favorite VARCHAR(100) NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    video_id VARCHAR(100) NOT NULL,
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
// 任意表查询所有数据
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
let addAdminUser = (value) => {
  let _sql = `insert into admin_users set username=?,password=?;`
  return query(_sql, value)
}

// 删除后台用户
let deleteAdminUserById = (id) => {
  let _sql = `delete from admin_users where id="${id}";`
  return query(_sql)
}

// 通过用户名查找用户
let findAdminUserByName = (name) => {
  let _sql = `select * from admin_users where username="${name}";`
  return query(_sql)
}

// 查找用户
let findAdminUserById = (id) => {
  let _sql = `select * from admin_users where id="${id}";`
  return query(_sql)
}

// 增加video数据
let addVideos = (value) => {
  let _sql = `insert into videos set name=?,country=?,classify=?,release_time=?,image_path=?,video_path=?,star=?,duration=?,detail=?;`
  return query(_sql, value)
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

// 删除video
let deleteVideoById = (id) => {
  let _sql = `delete from videos where id="${id}";`
  return query(_sql)
}

// 更新video
let updateVideo = (value) => {
  let _sql = `update videos set name=?,country=?,classify=?,release_time=?,image_path=?,video_path=?,star=?,duration=?,detail=? where id=?;`
  return query(_sql, value)
}

// 手机端相关功能

// 通过用户id查找用户
let findMobileUserById = (id) => {
  let _sql = `select * from mobile_users where id="${id}";`
  return query(_sql)
}

// 添加用户
let addMobileUser = (value) => {
  let _sql = `insert into mobile_users set username=?, password=?, date=?;`
  return query(_sql, value)
}

// 修改用户名
let updateMobileUserById = (value) => {
  let _sql = `update mobile_users set username=? where id=?;`
  return query(_sql, value)
}

// 添加头像
let updateMobileUserAvatorById = (value) => {
  let _sql = `update mobile_users set avator=? where id=?;`
  return query(_sql, value)
}

// 增加评论
let addComment = (value) => {
  let _sql = `insert into comments set user_id=?,date=?,content=?,video_id=?;`
  return query(_sql, value)
}

// 获取评论
let getComment = (page, num) => {
  let _sql = `select comments.id,comments.date,comments.content,comments.video_id, mobile_users.username, videos.name from comments left join mobile_users on comments.user_id=mobile_users.id left join videos on comments.video_id=videos.id limit ${(page - 1) * num}, ${num};`
  return query(_sql)
}
// 通过video_id获取评论
let getCommentByVideoId = (id) => {
  let _sql = `select * from comments where video_id="${id}";`
  return query(_sql)
}
// 通过用户id获取评论
let getCommentByUserId = (id) => {
  let _sql = `select * from comments where user_id="${id}";`
  return query(_sql)
}
// 删除评论
let deleteComment = (id) => {
  let _sql = `delete from comments where id="${id}";`
  return query(_sql)
}

// 增加favorite
let addFavorite = (value) => {
  let _sql = `insert into favorites set is_favorite=?,user_id=?,video_id=?;`
  return query(_sql, value)
}

// 获取喜欢的数量
let getFavorite = (page, num) => {
  let _sql = `select favorites.id,favorites.is_favorite,mobile_users.username,videos.name, videos.star from favorites left join mobile_users on favorites.user_id=mobile_users.id left join videos on favorites.video_id=videos.id limit ${(page - 1) * num}, ${num};`
  return query(_sql)
}

// 获取单个video里的用户的favorite状态
let getFavoriteById = (userId, videoId) => {
  let _sql = `select * from favorites where user_id="${userId}" AND video_id="${videoId}";`
  return query(_sql)
}

// 获取个人中心自己like/dislike的列表
let getFavoriteList = (id, type) => {
  let _sql = `select * from favorites where user_id='${id}' AND is_favorite='${type}'; `
  return query(_sql)
}
// 获取喜欢的数量
let getFavoriteCountByType = (type, videoId) => {
  let _sql = `select count(*) from favorites where is_favorite='${type}' AND video_id='${videoId}' ; `
  return query(_sql)
}
// 获取单个video的like/dislike总的数量
let getFavoriteCount = (videoId) => {
  let _sql = `select count(*) from favorites where video_id='${videoId}'; `
  return query(_sql)
}
// 更新videos star分数
let updateVideoStar = (value) => {
  let _sql = `update videos set star=? where id=?; `
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
  addAdminUser,
  deleteAdminUserById,
  findAdminUserByName,
  findAdminUserById,
  addVideos,
  findVideoByClassify,
  findVideoById,
  deleteVideoById,
  updateVideo,
  getCommentByVideoId,
  getCommentByUserId,
  updateMobileUserAvatorById,
  updateMobileUserById,
  addMobileUser,
  getFavoriteById,
  findMobileUserById,
  addComment,
  deleteComment,
  getComment,
  addFavorite,
  getFavorite,
  getFavoriteList,
  getFavoriteCountByType,
  getFavoriteCount,
  updateVideoStar,
  search
}