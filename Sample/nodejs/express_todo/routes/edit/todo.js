/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-11 22:08:29
 * @Description: 编辑待办事件
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-11 23:14:50
 */

const router = require('express').Router()
const _ = require('lodash')
const db = require('../../modules/db')
const utils = require('../../modules/utils')
const ObjectID = require('mongodb').ObjectID

router.post('/', async (req, res) => {
  const token = req.get('Authorization')
  const { id, name, detail, status, priority } = req.body

  // ❌ 没有传递 id
  if (!id) {
    const msg = '没有传递待办事项id'
    console.log(msg)
    res.send({ code: 0, msg })
    return
  }

  let updateObj = { name, detail, status, priority, time: new Date().valueOf() }

  await new Promise(resolve => {
    db.find('todo', { _id: ObjectID(id) }, (err, data) => {
      if (err) {
        const msg = `查询失败: ${err}`
        console.log(msg)
        res.send({ code: 0, msg })
        return
      }

      // 与原始值合并
      updateObj = _.merge(data[0], updateObj)
      resolve()
    })
  })

  // 用户验证
  await utils.verifyToken(res, token)

  utils.updateConnect({
    res,
    originform: 'todo',
    query: { _id: ObjectID(id) },
    updateObj
  })

})

module.exports = router
