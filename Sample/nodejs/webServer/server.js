const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')

const getmime = require('./getmime')

// 创建服务
const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname

  // 默认加载首页
  if (pathname === '/') {
    pathname = '/index.html'
  }

  if (pathname !== '/favicon.ico') {
    fs.readFile(`static${pathname}`, (err, data) => {
      // 如果没有读取到相应的路径文件
      // 显示 404 页面
      if (err) {
        console.log('404')
        fs.readFile(`static/404.html`, (error, data404) => {
          res.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8' })
          res.write(data404)
          res.end()
        })
      }

      // 若读取到文件, 则显示相应的文件
      else {
        // 获取文件的后缀名
        // 通过文件的后缀名, 动态获取文件的 'Content-Type' 值
        const extname = path.extname(pathname)
        const mime = getmime(extname)

        res.writeHead(200, { 'Content-Type': `${mime};charset="utf-8"` })
        // res.write(data.toString())
        // 如果转换成字符串, 会导致图片无法显示
        res.write(data)
        res.end()
      }
    })
  }
})

server.listen(8080)
