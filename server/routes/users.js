const express = require('express')
const userController = require('../controllers/userController')
const authenticate = require('../middleware/authentication')
const { adminOnly } = require('../middleware/authorization')
const user = express.Router()

user.post('/add-user', authenticate, adminOnly, userController.addUser)
user.post('/login', userController.userLogin)

module.exports = user