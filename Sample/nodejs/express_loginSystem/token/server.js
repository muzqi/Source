const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const DB = require('./modules/db')

const app = express()

// 用于加密和解密的秘钥
const secret = 'muziqi'

// 初始化数据库操作插件
const db = new DB({
  dburl: 'mongodb://localhost:27017',
  dbname: 'tokenlog'
})

// 中间件: body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 中间件: 允许跨域请求
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')                            // 允许请求的域
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')         // 允许的请求方式
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') // 允许客户端传输的请求头名称
  res.setHeader('Access-Control-Allow-Credentials', 'true')                    // 允许接受跨域的 cookie
  next()
})

// 接口: 登录
app.post('/login', (req, res) => {
  const { username, password } = req.body

  db.find('user', { username, password }, (err, data) => {
    if (err) {
      console.log(`查询数据失败: ${err}`)
      return
    }

    // 如果该用户存在
    if (data.length) {
      const token = jwt.sign(
        { username, password },
        secret,
        { expiresIn: '1h' }
      )

      res.send({
        code: 1,
        status: 200,
        msg: 'success',
        token
      })

    } else {
      res.send({
        code: 0,
        status: 403,
        msg: 'error username or password'
      })
    }
  })
})

// 接口: 获取内容
app.get('/getContent', (req, res) => {
  // 获取请求头中携带的 token
  const token = req.get('Authorization')

  // 验证解析 token
  jwt.verify(token, secret, (err, decoded) => {
    // 如果失败, 如没有携带 token, 则未登录
    if (err) {
      console.log(`token 解析失败: ${err}`)
      res.send({ code: 0, msg: '请先登录' })
    }

    // 使用解析成功的 token, 在数据库中查询该用户信息
    const { username, password } = decoded
    db.find('user', { username, password }, (err, data) => {
      if (err) {
        console.log(`查询数据失败: ${err}`)
      }

      if (data.length) {
        res.send({
          code: 1,
          msg: 'success',
          result: `你好 ${data[0].username}, 欢迎回来!`
        })
      } else {
        res.send({ code: 0, msg: 'error' })
      }
    })
  })
})

app.listen(3002)
