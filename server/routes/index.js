const express = require('express')
const Controller = require('../controllers/controller')
const route = express.Router()

route.use('/cuisines', require('./cuisines'))
route.use('/categories', require('./categories'))
route.use('/', require('./users'))
route.use('/pub/cuisines', require('./public'))

module.exports = route