/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-07 15:26:17
 * @Description: 注册
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-07 23:28:49
 */

const router = require('express').Router()
const md5 = require('md5-node')
const db = require('../../modules/db')

router.post('/', async (req, res) => {
  const { username, password, name = '', age = '', gender = '' } = req.body

  // ❌ 没有填写用户名或密码
  if (!username || !password) {
    const msg = '必须填写用户名或密码'
    console.log(msg)
    res.send({ code: 0, msg })
    return
  }

  await new Promise(resolve => {
    db.find('user', { username }, (err, data) => {
      // ❌ 系统错误
      if (err) {
        console.log(`查询失败: ${err}`)
        return
      }

      // ❌ 用户名已存在
      if (data.length > 0) {
        const msg = '该用户名已存在'

        console.log(msg)
        res.send({ code: 0, msg })
        return
      }

      // ✅ 用户名不存在, 则创建
      if (!data.length) {
        resolve()
      }
    })
  })

  // 通过验证后, 插入用户数据
  db.insert('user', { username, password: md5(password), name, age, gender }, (err, data) => {
    if (err) {
      console.log(`插入数据失败: ${err}`)
      return
    }

    res.send({ code: 1, msg: '注册成功' })
  })

})

module.exports = router
