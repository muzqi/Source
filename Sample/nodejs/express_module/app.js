const express = require('express')
const app = express()

const admin = require('./routes/admin/index')

app.use('/admin', admin)

app.get('/', (req, res) => {
  // 重定向至 login
  res.redirect('/admin/login')
})

const server = app.listen(10086, '127.0.0.1', () => {
  const { address: host, port } = server.address()
  console.log(`Example App run at http://${host}:${port}`)
})
