var filterService = require('../services/filterService');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get All Filters
 */
function getAllFilters(req, res) {
    return filterService.getAllFilters(req, res);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Add Filter Details
 */
function addFilter(req, res) {
    return filterService.addFilter(req, res);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 

 * Update Filter Details by FilterId
 */
function updateFilterById(req, res) {
    return filterService.updateFilterById(req.params.filterId, req.body, res);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Remove Filter Details By FilterId
 */
function removeFilterById(res, req) {
    return filterService.removeFilterById(req.params.filterId, res);
}


var filterController = { getAllFilters, addFilter, updateFilterById, removeFilterById }
module.exports = filterController