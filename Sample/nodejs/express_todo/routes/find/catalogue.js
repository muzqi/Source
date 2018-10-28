/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-07 16:28:13
 * @Description: 查询待办目录
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-08 02:29:26
 */

const router = require('express').Router()
const utils = require('../../modules/utils')

router.get('/', async (req, res) => {
  const token = req.get('Authorization')

  // 用户验证
  const { username, password } = await utils.verifyToken(res, token)

  utils.findConnect({
    res,
    idsform: 'user',
    idsQuery: { username, password },
    listform: 'catalogue'
  })
})

module.exports = router
