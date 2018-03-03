const path = require('path')
const fs = require('fs')
module.exports = function authrouter(router, basepath, dirs) {
  if (!router) throw 'router is not null'
  if (!dirs) throw 'dirs is not null'
  if (typeof dirs === 'string') {
    let stat = fs.statSync(path.resolve(basepath, dirs))
    if (stat.isFile())
      return
    dirs = [dirs]
  }
  for (let dir of dirs) {
    let files = fs.readdirSync(path.resolve(basepath, dir))
    if (dir.indexOf('/') == 0)
      dir = dir.substring(1)
    //去掉第一级目录
    let arr = dir.split('/')
    arr.shift()
    let newdir = arr.join('/')
    for (let file of files) {
      if (file.match(/\.js$/)) {
        file = file.substring(0, file.length - 3)
        const moduleExport = require(path.resolve(basepath, dir, file))
        if (file == 'index') file = ''
        const methodMap = moduleExport.methodMap
        for (let key of Object.keys(moduleExport)) {
          let value = moduleExport[key]
          if (typeof value !== 'function') continue
          let functionname = value.name
          let methods = methodMap && methodMap[functionname] || ['get']
          if (typeof methods === 'string')
            methods = [methods]
          if (functionname === 'index')
            functionname = ''
          for (let method of methods) {
            router[method](`${newdir ? `/${newdir}` : ''}${file ? `/${file}` : ''}${functionname ? `/${functionname}` : ''}`, value)
          }
        }
      } else {
        let stat = fs.statSync(path.resolve(basepath, dir, file))
        if (stat.isDirectory()) {
          authrouter(router, path.resolve(basepath), `${dir}/${file}`)
        }
      }
    }
  }
  return router
}