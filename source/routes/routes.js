var express = require('express');
var bodyParser = require('body-parser');
var routes = express.Router();
var hostelControllers = require('../controllers/hostelcontroller');
var filterController = require('../controllers/filterController');


/**
 * Hostel Routes
 */
routes.route('/hostel').get(hostelControllers.getAllHostel);
routes.route('/hostel/add').post(hostelControllers.addHostel);
routes.route('/hostel/writeByUploadFile').post(hostelControllers.onUploadFile);
routes.route('/hostel/visuals').get(hostelControllers.getAllImagesAndVideos);
routes.route('/hostel/getHostelById/:hostelId').get(hostelControllers.getHostelById);
routes.route('/hostel/update/:hostelId').put(hostelControllers.updateHostelById);
routes.route('/hostel/removeHostel/:hostelId').get(hostelControllers.removeHostelById);

/**
 * Filter Routes
 */
routes.route('/filter').get(filterController.getAllFilters);
routes.route('/filter/add').get(filterController.addFilter)
routes.route('/filter/update/:filterId').get(filterController.updateFilterById);
routes.route('/filter/remove/:filterId').get(filterController.removeFilterById);




module.exports = routes;