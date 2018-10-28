/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-07 23:52:28
 * @Description: 增加 todo
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-08 02:31:33
 */
const router = require('express').Router()
const ObjectID = require('mongodb').ObjectID
const utils = require('../../modules/utils')

router.post('/', async (req, res) => {
  const token = req.get('Authorization')
  const { catalogueid, name, detail = '', status = 0, priority = 0 } = req.body

  // 用户验证
  await utils.verifyToken(res, token)

  // 插入到数据库
  utils.insertConnect({
    res,
    insertform: 'todo',
    insertObj: { name, detail, status, priority },
    updateform: 'catalogue',
    updatequery: { _id: ObjectID(catalogueid) },
    isCount: true
  })
})

module.exports = router
