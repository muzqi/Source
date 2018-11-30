/*
 * @Author: liqi587@pingan.com.cn
 * @Tel:  17783701658
 * @Date: 2018-10-16 14:32:37
 * @Description: 服务器
 * @Last Modified by: liqi587@pingan.com.cn
 * @Last Modified time: 2018-10-16 14:44:20
 */

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const topics = require('./routes/topics')

// 中间件: 托管静态文件
app.use('/static', express.static('public'))

// 中间件: body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 中间件: 允许跨域请求, 允许头部携带 token
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')                            // 允许请求的域
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')         // 允许的请求方式
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, isClient') // 允许客户端传输的请求头名称
  res.setHeader('Access-Control-Allow-Credentials', 'true')                    // 允许跨域携带 cookie
  next()
})

app.use('/topics', topics)

// 监听端口, 启动服务
const server = app.listen(3004, '127.0.0.1', () => {
  const { address: host, port } = server.address()
  console.log(`App listening at http://${host}:${port}`)

  app.locals.baseUrl = `http://${host}:${port}`
})
