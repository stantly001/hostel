var bodyParser = require('body-parser');
var defaultService = require('../services/defaultService')


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Save Service
 */
function saveService(req, res) {
    return defaultService.saveService(req, res);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get All Services
 */
function getAllServices(req, res) {
    return defaultService.getAllServices(req, res);
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * Update Service 
 */
function updateService(req,res){
    return defaultService.updateService(req.params.serviceId, req.body, res);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Remove Service
 */
function removeServiceById(req, res) {
    return defaultService.removeServiceById(req.params.serviceId, res);
}

var defaultServiceController={
    saveService,getAllServices,updateService,removeServiceById
}
module.exports=defaultServiceController