var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Service Items
var Service = new Schema({
    service_name: {
        type: String
    }
}, {
        versionKey: false,
        collection: 'service'
    });



module.exports = mongoose.model('Service', Service);