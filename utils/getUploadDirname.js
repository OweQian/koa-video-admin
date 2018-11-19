function getUploadDirName() {
  const date = new Date()
  let month = Number.parseInt(date.getMonth()) + 1
  month = month.toString().length > 1 ? month : `0${month}`
  return `${date.getFullYear()}${month}${date.getDate()}`
}

module.exports = getUploadDirName