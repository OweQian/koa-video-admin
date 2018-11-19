const fs = require('fs')

function checkDirExist(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
}

module.exports = checkDirExist