const {Cuisine} = require('../models');

async function authorize(req, res, next) {
    try {
        const {id} = req.params
        const {userId, role} = req.user
        let data = await Cuisine.findByPk(id)
        if (!data) throw {name: "404"};
        if (role === 'admin') {
            next()
        } else if (role === 'staff') {
            if (userId === data.authorId) {
                next()
            } else {
                throw {name: 'notAuthorized'}
            }
        }
    } catch (error) {
        next(error)
    }
}

async function adminOnly(req,res,next) {
    try {
        const {role} = req.user
        if (role === 'admin') {
            next()
        } else {
           throw {name: 'notAuthorized'}
        }
    } catch (error) {
       next(error)
    }
}

module.exports = {authorize, adminOnly}