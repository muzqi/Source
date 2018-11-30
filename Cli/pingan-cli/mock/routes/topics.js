const router = require('express').Router()
const Mock = require('mockjs')

router.get('/', (req, res) => {
  res.send(Mock.mock({
    'code': 1,
    'msg': 'success',
    'result|5': [
      {
        'id': '@id',
        'title': '@cword'
      }
    ]
  }))
})

module.exports = router
