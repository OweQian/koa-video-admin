module.exports = {
  admin: {
    addVideo: require('./admin/addVideo'),
    adminUserList: require('./admin/adminUserList'),
    commentList: require('./admin/commentList'),
    deleteVideo: require('./admin/deleteVideo'),
    editVideo: require('./admin/editVideo'),
    favoriteList: require('./admin/favoriteList'),
    login: require('./admin/login'),
    mobileUserList: require('./admin/mobileUserList'),
    renderAddVideo: require('./admin/renderAddVideo'),
    renderEditVideo: require('./admin/renderEditVideo'),
    renderLogin: require('./admin/renderLogin'),
    renderLogout: require('./admin/renderLogout'),
    videoList: require('./admin/videoList')
  },
  mobile: {
    login: require('./mobile/login'),
    videoList: require('./mobile/videoList'),
  }
}