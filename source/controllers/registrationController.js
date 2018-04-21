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


var registrationController = {
    saveUser, getUserDetails
};

module.exports = registrationController;