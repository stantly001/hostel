var express = require('express');
var hostelService = require('../services/hostelService')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get All Hostel Data
 */
function getAllHostel(req, res) {
    console.log("Data ==>")
    return hostelService.getAllHostel(req, res)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Post New Hostel Data
 */
function addHostel(req, res) {
    return hostelService.addHostel(req, res)
}


/**
 * 
 * @param {*} req 
 * @param {*} file 
 * Write file ----- hmsDoc/Visuals
 */
function onUploadFile(req, res) {
    return hostelService.onUploadFile(req, res)
}

function getAllImagesAndVideos(req, res) {
    return hostelService.getAllImagesAndVideos(req, res)
}

var hostelController = { getAllHostel, addHostel, onUploadFile, getAllImagesAndVideos };

module.exports = hostelController;