const express = require('express')
const multiparty = require('multiparty')

const app = express()

// 托管静态资源
app.use('/statics', express.static('statics'))

app.get('/form', (req, res) => {
  // 如果要上传文件, enctype 必须设置成 multipart/form-data
  res.send(`
    <form action="/upload" enctype="multipart/form-data" method="post">
      <input type="text" name="username" />
      <input type="file" name="pic" />
      <input type="submit" value="submit" />
    </form>
  `)
})

app.post('/upload', (req, res) => {
  let form = new multiparty.Form()

  // 指定上传文件的路径, ⚠️ 必须是一个存在文件夹
  form.uploadDir = 'statics/images'

  /**
   * @param {Object} fields 文本域, 上传的文本信息
   * @param {Object} files  文件信息, 上传成功后的路径地址, 文件名等
   */
  form.parse(req, (err, fields, files) => {
    const username = fields.username[0]
    const picPath = files.pic[0].path

    res.send(`
      <p>用户名: ${username}</p>
      <p>服务器路径: ${picPath}</p>
    `)
  })
})

// 中间件, 处理路由错误
app.use((req, res) => {
  res.redirect('/form')
})

const server = app.listen(10086, '127.0.0.1', () => {
  const { address: host, port } = server.address()
  console.log(`Example App run at http://${host}:${port}`)
})
