var queryService = require('../services/queryService');
var mail = require('../utils/mail/mail')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function findSelectedHostelByQuery(req, res) {
    console.log(mail.mail(req, res))
    var queryParamsToObj = JSON.parse(req.query.queryFilter)
    return queryService.findSelectedHostelByQuery(queryParamsToObj, res)
}



var queryController = { findSelectedHostelByQuery };
module.exports = queryController;
