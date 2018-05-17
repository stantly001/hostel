var multer = require('multer')
var path = require('path');
var bodyParser = require('body-parser');

//Mongoose Models
var service = require('../models/service');

/**
 * 
 * @param {*} res 
 * Set Service
 */
function setService(res) {
    var post = new service({
        service_name: res.service_name
    })
    return post;
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Save Service
 */
function saveService(req, res) {
    var newService = setService(req.body);
    newService.save().then(item => {
        return res.status(200).json({ 'success': 'user added successfully', 'data': item });
    })
        .catch(err => {
            return res.status(400).send("unable to save to database");
        });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get All Services
 */
function getAllServices(req, res) {
    service.find(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(data);
        }
    })
}

/**
 * 
 * @param {*} id 
 * @param {*} serviceData 
 * @param {*} res 
 * update Service
 */
function updateService(id, serviceData, res) {
    service.findByIdAndUpdate(id, serviceData, { new: true })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            return res.status(400).send("unable to save to database");
        });
}

/**
 * 
 * @param {*} id 
 * @param {*} res 
 * Delete Service
 */
function removeServiceById(id, res) {
    service.findByIdAndRemove({ _id: id }, function (err, data) {
        return res.json({ 'success': 'Successfully removed', 'data': data });
    })
}
var hostelServicesService = {
    saveService, getAllServices, updateService,removeServiceById
};

module.exports = hostelServicesService;