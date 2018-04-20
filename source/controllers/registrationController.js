var express = require('express');
var registrationService = require('../services/registrationService')


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Save User Data
 */
function saveUser(req,res){
return registrationService.saveUser(req,res);
}