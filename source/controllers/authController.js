var authService = require('../services/authService');



function authentication(req, res) {
    var userAuth = req.query//req.body
    return authService.authentication(userAuth, res)
}

var authController = { authentication }
module.exports = authController;