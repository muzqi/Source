/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-07 16:09:00
 * @Description: 登录
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-19 22:11:02
 */

const router = require('express').Router()
const md5 = require('md5-node')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const db = require('../../modules/db')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  // ❌ 没有传 用户名或密码
  if (!username || !password) {
    const msg = '请填写用户名或密码'

    console.log(msg)
    res.send({ code: 0, msg })
    return
  }

  // 根据用户密码查询该用户的用户信息
  const userinfo = await new Promise(resolve => {
    db.find('user', { username, password: md5(password) }, (err, data) => {
      if (err) {
        console.log(`查询失败: ${err}`)
        return
      }

      // ❌ 用户或密码错误
      if (!data.length) {
        const msg = '用户名或密码错误'
        console.log(msg)
        res.send({ code: 0, msg })
        return
      }

      // ✅ 用户存在, 生成令牌返回给客户端
      if (data.length) {
        resolve(data[0])
      }
    })
  })

  // 生成 token
  const token = jwt.sign(
    { username: userinfo.username, password: userinfo.password },
    config.secret,
    { expiresIn: '10d' }
  )

  res.send({ code: 1, msg: '登录成功', token })
})

module.exports = router
