const express = require('express')
const Controller = require('../controllers/controller')
const pub = express.Router()

pub.get('/', Controller.getCuisinePub)
pub.get('/:id', Controller.getCuisineByIdPub)

module.exports = pub