const router = require('express').Router()
const signup = require('./signup')
const login = require('./login')

router.use('/signup', signup)
router.use('/login', login)

module.exports = router
