var express = require('express');
var bodyParser = require('body-parser');
var routes = express.Router();
var hostelControllers = require('../controllers/hostelcontroller')

routes.route('/hostel').get(hostelControllers.getAllHostel);
routes.route('/hostel/add').post(hostelControllers.addHostel);
routes.route('/hostel/writeByUploadFile').post(hostelControllers.onUploadFile)
routes.route('/hostel/visuals').get(hostelControllers.getAllImagesAndVideos)
routes.route('/hostel/getHostelById/:hostelId').get(hostelControllers.getHostelById)
routes.route('/hostel/update/:hostelId').put(hostelControllers.updateHostelById)
module.exports = routes;