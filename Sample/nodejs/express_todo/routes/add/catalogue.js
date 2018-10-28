/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-07 17:03:23
 * @Description: 增加目录
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-08 02:33:04
 */

const router = require('express').Router()
const db = require('../../modules/db')
const utils = require('../../modules/utils')

router.post('/', async (req, res) => {
  const token = req.get('Authorization')
  const { name: logname } = req.body

  // 用户验证
  const { username, password } = await utils.verifyToken(res, token)

  // 做同名目录校验
  await new Promise(resolve => {
    db.find('catalogue', { name: logname }, (err, data) => {
      // ❌ 若存在, 则不创建
      if (data.length) {
        const msg = '该目录已存在'
        console.log(msg)
        res.send({ code: 0, msg })
        return
      }

      resolve()
    })
  })

  // 插入到数据库
  utils.insertConnect({
    res,
    insertform: 'catalogue',
    insertObj: { name: logname, count: 0, todo: [] },
    updateform: 'user',
    updatequery: { username, password }
  })
})

module.exports = router
