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
    return hostelService.getHostelById(req.params.hostelId)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Update Hostel Detail By HostelId
 */
function updateHostelById(req, res) {
    return hostelService.updateHostelById(req.params.hostelId, req.body)
}

var hostelController = { getAllHostel, addHostel, onUploadFile, getAllImagesAndVideos, getHostelById, updateHostelById };

module.exports = hostelController;