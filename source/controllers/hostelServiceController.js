var bodyParser = require('body-parser');
var hostelServicesService = require('../services/hostelServicesService')


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Save Service
 */
function saveService(req, res) {
    return hostelServicesService.saveService(req, res);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get All Services
 */
function getAllServices(req, res) {
    return hostelServicesService.getAllServices(req, res);
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * Update Service 
 */
function updateService(req,res){
    return hostelServicesService.updateService(req.params.serviceId, req.body, res);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Remove Service
 */
function removeServiceById(req, res) {
    return hostelServicesService.removeServiceById(req.params.serviceId, res);
}

var hostelServiceController={
    saveService,getAllServices,updateService,removeServiceById
}
module.exports=hostelServiceController