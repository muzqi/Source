/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-08 01:58:43
 * @Description: 根据目录查找待办事件
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-08 02:29:57
 */

const router = require('express').Router()
const ObjectID = require('mongodb').ObjectID
const utils = require('../../modules/utils')

router.get('/', async (req, res) => {
  const { catalogueid } = req.query
  const token = req.get('Authorization')

  // 用户验证
  await utils.verifyToken(res, token)

  utils.findConnect({
    res,
    idsform: 'catalogue',
    idsQuery: { _id: ObjectID(catalogueid) },
    listform: 'todo'
  })
})

module.exports = router
