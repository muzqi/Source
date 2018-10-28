const fs = require('fs')

// 1. 同步读取文件方法
module.exports = extname => {
  const mime = JSON.parse(fs.readFileSync('./mime.json').toString())
  return mime[extname] || 'text/html'
}

// 2. 利用闭包回调函数取得数据
// module.exports = (extname, callback) => {
//   fs.readFile('./mime.json', (err, data) => {
//     const mime = JSON.parse(data.toString())
//     callback(mime)
//   })
// }

// 3. 利用 EventEmitter 事件广播
// module.exports = (extname, EventEmitter) => {
//   fs.readFile('./mime.json', (err, data) => {
//     const mime = JSON.parse(data.toString())[extname]
//     EventEmitter.emit('get_mime', mime)
//   })
// }
