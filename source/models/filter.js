var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var filter = new Schema({
    // _id: Schema.Types.ObjectId,
    filter: [{
        field_name: {
            type: String
        },
        disp_name: {
            type: String
        },
        sub_title: {
            type: String
        },
        view_type:{
            type: String
        },
        filter_types: [{
            field_name: {
                type: String
            },
            disp_name: {
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