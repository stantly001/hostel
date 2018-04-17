var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var filter = new Schema({
    // _id: Schema.Types.ObjectId,
    filter: [{
        fieldName: {
            type: String
        },
        dispName: {
            type: String
        },
        type: {
            type: String
        },
        viewType:{
            type: String
        },
        filterTypes: [{
            fieldName: {
                type: String
            },
            dispName: {
                type: String
            },
            start:{
                type: Number
            },
            end: Number
        }]
    }],
    created_date: {
        type: Date,
        default: Date.now
    }
}, {
        versionKey: false,
        collection: 'filter'
    })

module.exports = mongoose.model('Filter', filter)