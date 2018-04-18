var express = require('express');
var hostelService = require('../services/hostelService')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get All Hostel Data
 */
function getAllHostel(req, res) {
    var returnHostelData = hostelService.getAllHostel(req, res)
    return returnHostelData;
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

/**
 * 
 * @param {*} req 
 * @param {*} res
 * Get All Images and Videos By Hostels 
 */
function getAllImagesAndVideos(req, res) {
    return hostelService.getAllImagesAndVideos(req, res)
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get Hostel Details By Hostel Id
 */
function getHostelById(req, res) {
    return hostelService.getHostelById(req.params.hostelId, res)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Update Hostel Detail By HostelId
 */
function updateHostelById(req, res) {
    return hostelService.updateHostelById(req.params.hostelId, req.body, res)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Remove Hostel Obj By Id from hostel Collection And Remove ref Collection of hostelImg 
 */
function removeHostelById(req, res) {
    return hostelService.removeHostelById(req.params.hostelId, res)
}

var hostelController = {
    getAllHostel, addHostel, onUploadFile, getAllImagesAndVideos,
    getHostelById, updateHostelById, removeHostelById
};

module.exports = hostelController;
