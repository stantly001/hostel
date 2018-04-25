var authService = require('../services/authService');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * User Auth
 */
function authentication(req, res) {
    var userAuth = req.body;//req.query//req.body
    return authService.authentication(userAuth, res)
}

var authController = { authentication }
module.exports = authController;