/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-19 23:33:58
 * @Description: 删除多条todo
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-19 23:54:48
 */

const router = require('express').Router()
const ObjectID = require('mongodb').ObjectID
const _ = require('lodash')
const db = require('../../modules/db')
const utils = require('../../modules/utils')

router.post('/', async (req, res) => {
  const token = req.get('Authorization')
  const { catalogueid, id } = req.body

  // 用户验证
  await utils.verifyToken(res, token)

  // 1. 删除对应 catalogue 表中的 todo id
  const catalogueData = await new Promise(resolve => {
    db.find('catalogue', { _id: ObjectID(catalogueid) }, (err, data) => {
      if (err) {
        const msg = `查询失败: ${err}`
        console.log(msg)
        res.send({ code: 0, msg })
        return
      }

      resolve(data[0])
    })
  })

  catalogueData.todo = _.remove(catalogueData.todo, d => String(d) !== id)

  await new Promise(resolve => {
    db.update('catalogue', { _id: ObjectID(catalogueid) }, catalogueData, err => {
      if (err) {
        const msg = `更新失败: ${err}`
        console.log(msg)
        res.send({ code: 0, msg })
        return
      }

      resolve()
    })
  })

  // 2. 删除 todo 表中对应的数据
  await new Promise(resolve => {
    db.deleteOne('todo', { _id: ObjectID(id) }, err => {
      if (err) {
        const msg = `删除失败: ${err}`
        console.log(msg)
        res.send({ code: 0, msg })
        return
      }

      resolve()
    })
  })

  res.send({ code: 1, msg: 'success' })
})

module.exports = router
