var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Service Items
var ServiceSchema = new Schema({
    service_name: {
        type: String
    }
}, {
        versionKey: false,
        collection: 'service'
    });



module.exports = mongoose.model('service', ServiceSchema);