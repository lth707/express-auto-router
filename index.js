const path = require('path')
const fs = require('fs')
module.exports = function (router, paths) {
  if (typeof paths === 'string')
    paths = [paths]
  for (let path of paths) {
    let files = fs.readdirSync(path.resolve(__dirname, path))
    for (let file of files) {
      if (file.match(/\.js$/)) {
        file = file.substring(0, file.length - 3)
        const moduleExport = require(path.resolve(__dirname, path, file))
        const methodMap = moduleExport.methodMap
        for (let key of Object.keys(moduleExport)) {
          let value = moduleExport[key]
          if (typeof value !== 'function') continue
          let functionname = value.name
          let method = methodMap[functionname] || 'get'
          router[method](path.resolve(__dirname, path, file, functionname), value)
        }
      }
    }
  }
}