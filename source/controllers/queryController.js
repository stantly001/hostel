var queryService = require('../services/queryService');


function findSelectedHostelByQuery(req, res) {
    var queryParamsToObj = JSON.parse(req.query.queryFilter)

    return queryService.findSelectedHostelByQuery(queryParamsToObj, res)
}



var queryController = { findSelectedHostelByQuery };
module.exports = queryController;
