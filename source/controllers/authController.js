var authService = require('../services/authService');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * User Auth
 */
function authentication(req, res) {
    //var userAuth = req.body;//req.query//req.body
    return authService.userLogin(req, res)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Logout
 */
function logout(req, res) {
    return authService.logout(req, res)
}

var authController = { authentication, logout }
module.exports = authController;