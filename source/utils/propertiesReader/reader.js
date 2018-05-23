var PropertiesReader = require('properties-reader');
var path = require('../prop_url')

/**
 * 
 * @param {*} url 
 * Property Reader
 */
function filePath(url) {
    var returnObj = PropertiesReader(url);
    return returnObj
}

/**
 * Mail
 */
function mail_reader() {
    return filePath(path.prop.mail_config);
}

/**
 * SMS
 */
function sms_reader() {
    return filePath(path.prop.sms_config)
}

/**
 * DB
 */
function db_reader() {
    return filePath(path.prop.db_config)
}


var Property_reader = { filePath, mail_reader, sms_reader, db_reader }

module.exports = Property_reader