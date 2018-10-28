const jwt = require('jsonwebtoken')
const db = require('./db')
const config = require('../config')
const ObjectID = require('mongodb').ObjectID

/**
 * 增加目录或列表的表联动
 * 1. 将增加的目录或列表添加到数据库表中
 * 2. 将这些目录或列表的id添加到 user 表中
 * @param {Object}  res         res
 * @param {String}  insertform  需要插入数据的表的名称
 * @param {Object}  insertObj   插入的数据集
 * @param {String}  updateform  需要更新包含列表id的表的名称
 * @param {String}  updatequery 更新的表的查询条件
 * @param {Boolean} isCount     是否增加计数
 */
const insertConnect = async ({ res, insertform, insertObj, updateform, updatequery, isCount = false }) => {
  // [1]
  const item = await new Promise(resolve => {
    // const date = new Date()
    // const currentTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

    insertObj.time = new Date().valueOf()
    db.insert(insertform, insertObj, (err, data) => {
      if (err) {
        const msg = `插入数据失败: ${err}`
        console.log(msg)
        res.send({ code: 0, msg })
        return
      }

      resolve(data.ops[0])
    })
  })

  // [2]
  let update = await new Promise(resolve => {
    db.find(updateform, updatequery, (err, data) => {
      if (err) {
        const msg = `查询数据失败: ${err}`
        console.log(msg)
        res.send({ code: 0, msg })
        return
      }
      resolve(data[0])
    })
  })

  let arr = update[insertform]
  arr = arr ? arr : []
  arr.push(item._id)

  let $set = isCount
    ? { [insertform]: arr, count: Number(update.count) + 1 }
    : { [insertform]: arr }

  db.update(updateform, updatequery, $set, (err, data) => {
    if (err) {
      const msg = `更新数据失败: ${err}`
      console.log(msg)
      res.send({ code: 0, msg })
      return
    }

    res.send({ code: 1, msg: 'success', result: { id: item._id } })
  })
}

/**
 * 查找
 * @param {Object} res      res
 * @param {String} idsform  存放信息id的父表
 * @param {Object} idsQuery 父表的查询条件
 * @param {String} listform 存放列表信息的子表
 */
const findConnect = async ({ res, idsform, idsQuery, listform }) => {
  // 获取该用户的目录id列表
  const IDs = await new Promise(resolve => {
    db.find(idsform, idsQuery, (err, data) => {
      if (err) {
        const msg = `查询失败: ${err}`
        console.log(msg)
        res.send({ code: 0, msg })
        return
      }

      resolve(data[0][listform])
    })
  })

  //
  let arr = []
  for (let id of IDs) {
    const item = await new Promise(resolve => {
      db.find(listform, { _id: ObjectID(id) }, (err, data) => {
        if (err) {
          const msg = `查询失败: ${err}`
          console.log(msg)
          res.send({ code: 0, msg })
          return
        }

        data[0].id = data[0]._id
        delete data[0]._id
        resolve(data[0])
      })
    })
    arr.push(item)
  }

  res.send({ code: 1, msg: 'success', result: arr })
}

/**
 * 编辑
 * @param {Object} res        res
 * @param {String} originform 需要编辑的内容在哪个表
 * @param {Object} query      查询条件
 * @param {Object} updateObj  更新内容
 */
const updateConnect = ({ res, originform, query, updateObj }) => {
  db.update(originform, query, updateObj, (err) => {
    if (err) {
      const msg = `编辑失败: ${err}`
      console.log(msg)
      res.send({ code: 0, msg })
      return
    }

    res.send({ code: 1, msg: 'sucess' })
  })
}

/**
 * 验证用户合法性
 * @param {Object} res    res
 * @param {String} token  token
 */
const verifyToken = (res, token) => {
  return new Promise(resolve => {
    // ❌ 没有 token
    if (!token) {
      const msg = '无权访问'
      console.log(msg)
      res.status(403).send({ code: 0, msg })
      return
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      // ❌ 无效的 token
      if (err) {
        const msg = `无效的 token: ${err}`
        console.log(msg)
        res.send({ code: 0, msg })
        return
      }

      resolve(decoded)
    })
  })
}

exports.insertConnect = insertConnect
exports.findConnect = findConnect
exports.updateConnect = updateConnect
exports.verifyToken = verifyToken
