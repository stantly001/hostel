var express = require('express');
var bodyParser = require('body-parser');
var hostelService = express.Router();
var hostelControllers = require('../controllers/hostelcontroller')

hostelService.route('/hostel').get(hostelControllers.getAllHostel);
hostelService.route('/hostel/add').post(hostelControllers.addHostel);
hostelService.route('/hostel/writeByUploadFile').post(hostelControllers.onUploadFile)
hostelService.route('/hostel/visuals').get(hostelControllers.getAllImagesAndVideos)


module.exports = hostelService;