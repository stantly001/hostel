var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Service Items
var Service = new Schema({
    service_name: {
        type: String
    }, 
    created: {
        type: Date,
        default: Date.now
    },
    last_updated: {
        type: Date,
        default: Date.now
    },
}, {
        versionKey: false,
        collection: 'service'
    });



module.exports = mongoose.model('Service', Service);