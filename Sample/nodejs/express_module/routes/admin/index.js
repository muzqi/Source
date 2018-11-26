const express = require('express')
const router = express.Router()

const login = require('./login')
const logout = require('./logout')

router.get('/', (req, res) => {
  res.send('admin')
})

router.use('/login', login)
router.use('/logout', logout)

module.exports = router
