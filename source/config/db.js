var property_reader = require('../utils/propertiesReader/reader')



var db_path = property_reader.db_reader().get('url')

module.exports = {
    db: db_path
};