const url = require('url')
const express = require('express')
const md5 = require('md5-node')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const DB = require('./modules/db')

const app = express()

// 初始化数据库操作插件
const db = new DB({
  dburl: 'mongodb://localhost:27017',
  dbname: 'sessionlog'
})

// 中间件: body-parser 用于获取 POST 请求参数
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 中间件: express-session 用于生成 session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 30 },
  rolling: true,

  // 配置 connect-mongo 中间件, 用于将 session 与数据库相连
  store: new MongoStore({
    url: 'mongodb://localhost:27017/sessionlog',
    touchAfter: 24 * 3600
  })
}))

// 中间件: 自定义中间件, 用于用户登录状态的判断
app.use((req, res, next) => {
  // 如果是入口页面或登录接口, 则继续匹配路由
  const pathname = url.parse(req.url).pathname

  const condition =
    pathname === '/entrance' || pathname === '/login' || pathname === '/register'

  if (condition) {
    next()
  }

  // ⚠️ 登录状态判断:
  // 1. 如果不是入口页面, 则需要判断用户是否登录
  // 2. 若没有登录, 则重定向到登录页面
  // -------------------------
  // 因为在请求 '/logout' 接口时, 会将当前的会话销毁,
  // 由此作为条件, 我们就可以判断用户是否在登录状态
  else {
    if (req.session.isLogin) {
      console.log('登录成功')
      next()
    } else {
      res.redirect('/entrance')
    }
  }
})

// 视图: 入口登录页面
app.get('/entrance', (req, res) => {
  res.send(`
    <form action="/register" method="post">
      <input type="text" name="username" />
      <input type="password" name="password" />
      <input type="submit" value="sign up">
    </form>

    <form action="/login" method="post">
      <input type="text" name="username" />
      <input type="password" name="password" />
      <input type="submit" value="log in">
    </form>
  `)
})

// 视图: 登录成功后的内容页
app.get('/content', (req, res) => {
  const username = req.session.userinfo.username

  res.send(`
    您好, ${username}
    <a href='/logout'>退出登录</a>
  `)
})

// 接口: 注册
app.post('/register', (req, res) => {
  const { username, password } = req.body

  db.insert('user', { username, password: md5(password) }, err => {
    if (err) {
      console.log(`注册失败: ${err}`)
      return
    }

    res.redirect('/entrance')
  })
})

// 接口: 登录
app.post('/login', (req, res) => {
  const { username, password } = req.body

  // 根据提交的用户密码为条件, 在数据库 user 表中查询
  db.find('user', { username, password: md5(password) }, (err, data) => {
    if (err) {
      console.log(`查询用户信息失败: ${err}`)
      return
    }

    // 如果该用户存在, 则创建 session 会话
    if (data.length > 0) {
      req.session.isLogin = true
      req.session.userinfo = data[0]

      res.redirect('/content')
    } else {
      res.send(`
        <script>
          alert('用户名或密码错误')
          location.href='/entrance'
        </script>
      `)
    }
  })
})

// 接口: 登出
app.get('/logout', (req, res) => {

  // 销毁当前用户的 session
  req.session.destroy((err => {
    if (err) {
      console.log(`退出登录失败: ${err}`)
      return
    }

    res.redirect('/entrance')
  }))
})

const server = app.listen(3001, '127.0.0.1', () => {
  const { address: host, port } = server.address()
  console.log(`Example App run at http://${host}:${port}`)
})
