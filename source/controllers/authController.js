var authService = require('../services/authService');



function authentication(req, res) {
    return authService.authentication(res)
}

var authController = { authentication }
module.exports = authController;