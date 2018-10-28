/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-19 22:37:39
 * @Description: 删除目录
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-19 23:26:02
 */

const router = require('express').Router()
const ObjectID = require('mongodb').ObjectID
const _ = require('lodash')
const db = require('../../modules/db')
const utils = require('../../modules/utils')

router.post('/', async (req, res) => {
  const token = req.get('Authorization')
  const { id } = req.body

  // 用户验证
  const { username, password } = await utils.verifyToken(res, token)

  // 1. 删除用户表中存储的目录 id
  let userData = await new Promise(resolve => {
    db.find('user', { username, password }, (err, data) => {
      if (err) {
        const msg = `查询失败: ${err}`
        console.log(msg)
        res.send({ code: 0, msg })
        return
      }

      resolve(data[0])
    })
  })

  userData.catalogue = _.remove(userData.catalogue, d => String(d) !== id)

  await new Promise(resolve => {
    db.update('user', { username, password }, userData, err => {
      if (err) {
        const msg = `更新失败: ${err}`
        console.log(msg)
        res.send({ code: 0, msg })
        return
      }

      resolve()
    })
  })

  // 2. 在 todo 表中删除目录表中拥有的 todo
  const todoIds = await new Promise(resolve => {
    db.find('catalogue', { _id: ObjectID(id) }, (err, data) => {
      if (err) {
        const msg = `查询失败: ${err}`
        console.log(msg)
        res.send({ code: 0, msg })
        return
      }

      resolve(data[0].todo)
    })
  })

  for (let todoId of todoIds) {
    await new Promise(resolve => {
      db.deleteOne('todo', { _id: ObjectID(todoId) }, err => {
        if (err) {
          const msg = `删除失败: ${err}`
          console.log(msg)
          res.send({ code: 0, msg })
          return
        }

        resolve()
      })
    })
  }

  // 3. 删除目录表中对应的数据
  await new Promise(resolve => {
    db.deleteOne('catalogue', { _id: ObjectID(id) }, (err, data) => {
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
