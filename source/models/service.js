var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Hostel Items
var ServiceSchema = new Schema({
    service_name: {
        type: String
    }
}, {
        versionKey: false,
        collection: 'service'
    });



module.exports = mongoose.model('service', ServiceSchema);