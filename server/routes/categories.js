const express = require('express')
const Controller = require('../controllers/controller')
const authenticate = require('../middleware/authentication')
const { authorize } = require('../middleware/authorization')
const cat = express.Router()

cat.use(authenticate)
cat.post('/', Controller.postCategory)
cat.get('/', Controller.getCategories)
cat.put('/:catId', authorize, Controller.updateCategories)
cat.delete('/:catId', authorize, Controller.deleteCategory)

module.exports = cat