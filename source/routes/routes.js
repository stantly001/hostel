var express = require('express');
var bodyParser = require('body-parser');
var routes = express.Router();
var hostelControllers = require('../controllers/hostelcontroller');
var filterController = require('../controllers/filterController');
var registrationController = require('../controllers/registrationController');
var hostelServiceController=require('../controllers/hostelServiceController');
var roomController=require("../controllers/roomController");
var authServiceCtrl = require('../controllers/authController');


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
routes.route('/service/saveService').post(hostelServiceController.saveService);
routes.route('/service').get(hostelServiceController.getAllServices);
routes.route('/service/update/:serviceId').put(hostelServiceController.updateService);
routes.route('/service/remove/:serviceId').delete(hostelServiceController.removeServiceById);

/**
 * rooms
 */
routes.route('/room/saveRoom').post(roomController.saveRoom);
routes.route('/room').get(roomController.getRoomDetails);
routes.route('/room/:hostelId').get(roomController.getRoomDetailsByHostelId);
routes.route('/room/update/:roomId').put(roomController.updateRoom);


/**
 * User Login
 */
routes.route('/auth/user').post(authServiceCtrl.authentication)


module.exports = routes;
