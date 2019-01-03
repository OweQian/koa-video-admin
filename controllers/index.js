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
    videoDetail: require('./mobile/videoDetail'),
    videoComments: require('./mobile/videoComments'),
    userComments: require('./mobile/userComments'),
    addComments: require('./mobile/addComments'),
    deleteComments: require('./mobile/deleteComments'),
    addFavorite: require('./mobile/addFavorite'),
    videoFavorite: require('./mobile/videoFavorite'),
    userFavorite: require('./mobile/userFavorite'),
    search: require('./mobile/search'),
    code: require('./mobile/code'),
    uploadAvator: require('./mobile/uploadAvator'),
    avator: require('./mobile/avator'),
    editUsername: require('./mobile/editUsername'),
  }
}