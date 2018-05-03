var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define collection and schema for Hostel Items
var Room = new Schema({
    hostel_id: {
        type: Schema.Types.ObjectId,
        ref: 'Hostel'
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    last_updated: {
        type: Date,
        default: Date.now
    },
    floors: [{
        no_of_rooms: {
            type: Number
        },
        floor_no: {
            type: Number
        },
        rooms: [{
            room_services: [{
                service: {
                    type: Schema.Types.ObjectId,
                    ref: 'Service'
                }, 
                amount_per_month: Number,
                amount_per_day: Number,
                amount_per_week: Number,
                free_service: Boolean
            }],
            is_active: {
                type: Boolean
            },
            no_of_beds: {
                type: Number
            },
            room_number: {
                type: String
            },
            is_active: {
                type: Boolean
            },
            view_type: {
                type: Object
            }
        }],
    }]
}, {
        versionKey: false,
        collection: 'room'
    });

module.exports = mongoose.model('Room', Room);