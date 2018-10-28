const router = require('express').Router()
const catalogue = require('./catalogue')
const todo = require('./todo')

router.use('/catalogue', catalogue)
router.use('/todo', todo)

module.exports = router
