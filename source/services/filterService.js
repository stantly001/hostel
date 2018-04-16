var bodyParser = require('body-parser');
var path = require('path');

//Mongoose Model

var filter = require('../models/filter')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get All Filters
 */
function getAllFilters(req, res) {
    filter.find(function (err, data) {
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
 * @param {*} req 
 * @param {*} res 
 * Add Filter Details
 */
function addFilter(req, res) {
    var filterData = new filter(req.body);
    filterData.post()
        .then(data => {
            return res.status('200').json({ 'message': 'Hostel added successfully', 'data': data })
        })
        .catch(err => {
            return res.status(400).send("unable to save to database");
        });
}


/**
 * 
 * @param {*} id 
 * @param {*} filterData 
 * @param {*} res 
 * Update Filter Details by FilterId
 */
function updateFilterById(id, filterData, res) {
    filter.findByIdAndUpdate(id, filterData, { new: true })
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
 * Remove Filter Details By FilterId
 */
function removeFilterById(id, res) {
    filter.findByIdAndRemove({ _id: id }, function (err, data) {
        return res.json({ 'success': 'Successfully removed', 'data': data });
    })
}

var filterService = { getAllFilters, addFilter, updateFilterById, removeFilterById };
module.exports = filterService;