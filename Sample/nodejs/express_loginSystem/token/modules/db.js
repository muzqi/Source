/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-04 21:13:35
 * @Description: 封装数据库操作
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-05 21:33:01
 */

const MongoClient = require('mongodb').MongoClient

module.exports = class DB {

  /**
   * 实例化
   * @param {String} dburl  数据库的地址
   * @param {String} dbname 需要连接的数据库的名称
   */
  constructor({ dburl = 'mongodb://localhost:27017', dbname = '' }) {
    this.dburl = dburl
    this.dbname = dbname
  }

  /**
   * 连接数据库
   * @param {Func} callback 连接成功后的回调函数
   */
  connect(callback) {
    MongoClient.connect(this.dburl, { useNewUrlParser: true }, (err, db) => {
      if (err) {
        console.log(`数据库连接失败: ${err}`)
        return
      }

      callback(db)
    })
  }

  /**
   * 查询数据
   * @param {String} collectionname 表名称
   * @param {Object} query          查询条件
   * @param {Func}   callback       查询到结果后的回调
   */
  find(collectionname, query, callback) {
    this.connect(db => {
      const database = db.db(this.dbname)
      const result = database.collection(collectionname).find(query)

      result.toArray((err, data) => {
        callback(err, data)
        db.close()
      })
    })
  }

  /**
   * 插入数据
   * @param {String} collectionname 表名称
   * @param {Object} json           插入的数据
   * @param {Func}   callback       插入完成后的回调
   */
  insert(collectionname, json, callback) {
    this.connect(db => {
      const database = db.db(this.dbname)

      database.collection(collectionname).insertOne(json, (err, data) => {
        callback(err, data)
        db.close()
      })
    })
  }

  /**
   * 修改数据
   * @param {String} collectionname 表名称
   * @param {Object} query          查询条件
   * @param {Object} json           修改的数据
   * @param {Func}   callback       修改完成后的回调
   */
  update(collectionname, query, json, callback) {
    this.connect(db => {
      const database = db.db(this.dbname)

      database
        .collection(collectionname)
        .updateOne(query, { $set: json }, (err, data) => {
          callback(err, data)
          db.close()
        })
    })
  }

  /**
   * 删除数据
   * @param {String} collectionname 表名称
   * @param {Object} query          查询条件
   * @param {Func}   callback       删除完成后的回调
   */
  deleteOne(collectionname, query, callback) {
    this.connect(db => {
      const database = db.db(this.dbname)

      database
        .collection(collectionname)
        .deleteOne(query, (err, data) => {
          callback(err, data)
          db.close()
        })
    })
  }
}
