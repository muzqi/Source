/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-08 20:11:33
 * @Description: 编辑目录
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-11 22:48:59
 */

const router = require('express').Router()
const db = require('../../modules/db')
const utils = require('../../modules/utils')
const ObjectID = require('mongodb').ObjectID

router.post('/', async (req, res) => {
  const token = req.get('Authorization')
  const { id, name } = req.body

  let updateObj = { name, time: new Date().valueOf() }

  // ❌ 客户端没有传递 name
  if (!name) {
    await new Promise(resolve => {
      db.find('catalogue', { _id: ObjectID(id) }, (err, data) => {
        if (err) {
          const msg = `查询失败: ${err}`
          console.log(msg)
          res.send({ code: 0, msg })
          return
        }

        updateObj.name = data[0].name
        resolve()
      })
    })
  }

  // 用户验证
  await utils.verifyToken(res, token)

  // 根据 id 查找对应的目录
  utils.updateConnect({
    res,
    originform: 'catalogue',
    query: { _id: ObjectID(id) },
    updateObj
  })
})

module.exports = router
