var bodyParser = require('body-parser');
var path = require('path');
var Q = require('q');
//Mongoose Model
var hostel = require('../models/hostel')
var filter = require('../models/filter')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get All Filters
 */
function getAllFilters(req, res) {
    var minMax = {};

    return Q.all([
        Q(filter.find()),
        Q(hostel.aggregate([{
            "$group": {
                "_id": null,
                "min": { "$min": "$hostel_services.base_amount" },
                "max": { "$max": "$hostel_services.base_amount" }
            }
        }]))
    ]).spread(function (filter, hostel) {
        minMax.min = hostel[0].min[0] ? hostel[0].min[0] : 0;
        minMax.max = hostel[0].max[0] ? hostel[0].max[0] : (minMax.min + 1);
        res.json({ filterData: filter, hostel: minMax })
    })


    // filter.find(function (err, data) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         return res.json(data);
    //     }
    // })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Add Filter Details
 */
function addFilter(req, res) {
    var filterData = new filter(req.body);
    filterData.save()
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
