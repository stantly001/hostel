var express = require('express');
var bodyParser = require('body-parser');
var routes = express.Router();
var hostelControllers = require('../controllers/hostelcontroller');
var filterController = require('../controllers/filterController');
var registrationController = require('../controllers/registrationController');
var serviceController=require('../controllers/serviceController')


/**
 * Hostel Routes
 */
routes.route('/hostel').get(hostelControllers.getAllHostel);
routes.route('/hostel/add').post(hostelControllers.addHostel);
routes.route('/hostel/writeByUploadFile').post(hostelControllers.onUploadFile);
routes.route('/hostel/visuals').get(hostelControllers.getAllImagesAndVideos);
routes.route('/hostel/getHostelById/:hostelId').get(hostelControllers.getHostelById);
routes.route('/hostel/update/:hostelId').put(hostelControllers.updateHostelById);
routes.route('/hostel/removeHostel/:hostelId').delete(hostelControllers.removeHostelById);
routes.route('/hostel/imageUrl').get(hostelControllers.getImageFromDirectory)
//http://localhost:4000/hms/hostel/imageUrl?imgUrl=../hmsDoc/visuals/image_G0oXcNHMaaquGxf73Ousw0LRrwr4lFBk_images.jpeg

/**
 * Filter Routes
 */
routes.route('/filter').get(filterController.getAllFilters);
routes.route('/filter/add').post(filterController.addFilter)
routes.route('/filter/update/:filterId').put(filterController.updateFilterById);
routes.route('/filter/remove/:filterId').delete(filterController.removeFilterById);

/**
 * User Registration
 */
routes.route('/user/registration').post(registrationController.saveUser);
routes.route('/user').get(registrationController.getUserDetails);
routes.route('/user/getUserByUsername').get(registrationController.getUserByUserName)


/**
 * Service
 */
routes.route('/service/saveService').post(serviceController.saveService);
routes.route('/service').get(serviceController.getAllServices);
routes.route('/service/update/:serviceId').put(serviceController.updateService);
routes.route('/service/remove/:serviceId').delete(serviceController.removeServiceById);
module.exports = routes;
