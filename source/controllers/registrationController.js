var bodyParser = require('body-parser');
var registrationService = require('../services/registrationService')


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Save User Data
 */
function saveUser(req, res) {
    return registrationService.saveUser(req, res);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get User Details
 */
function getUserDetails(req, res) {
    return registrationService.getUserDetails(req, res);
}

function getUserByUserName(req, res) {
    var returnData = registrationService.getUserByUserName(req.query.userName, res)
    console.log(returnData)
    return returnData
}


var registrationController = {
    saveUser, getUserDetails, getUserByUserName
};

module.exports = registrationController;