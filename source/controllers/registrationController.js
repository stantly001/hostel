var express = require('express');
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
    var returnData = registrationController.getUserDetails(req.query.userName)

    return res.json(returnData)
}


var registrationController = {
    saveUser, getUserDetails, getUserByUserName
};

module.exports = registrationController;