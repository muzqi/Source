const express = require('express')
const bodyParser = require('body-parser')

const register = require('./routes/register/index')
const find = require('./routes/find/index')
const add = require('./routes/add/index')
const edit = require('./routes/edit/index')
const del = require('./routes/delete')

const app = express()

// 中间件: body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 中间件: 允许跨域请求
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')                            // 允许请求的域
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')         // 允许的请求方式
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') // 允许客户端传输的请求头名称
  res.setHeader('Access-Control-Allow-Credentials', 'true')                    // 允许跨域携带 cookie
  next()
})

// 路由模块: 登录注册
app.use('/register', register)

// 路由模块: 查询
app.use('/find', find)

// 路由模块: 增加
app.use('/add', add)

// 路由模块: 编辑
app.use('/edit', edit)

// 路由模块: 删除
app.use('/delete', del)

// 监听端口, 启动服务
const server = app.listen(3003, '127.0.0.1', () => {
  const { address: host, port } = server.address()
  console.log(`Example app listening at http://${host}:${port}`)
})
