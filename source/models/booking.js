var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var booking = new Schema({
    hostel_id: {
        type: Schema.Types.ObjectId,
        ref: 'Hostel'
    },
    room_id: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    },
    from_date: {
        type: Date
    },
    to_date: {
        type: Date
    },
    floors: [{
        floor_no: Number,
        rooms: [{
            room_id_by_floor: String,
            room_number: {
                type: Number
            },
            room_type: {
                type: String
            },
            free_service: [{
                service: {
                    type: Schema.Types.ObjectId,
                    ref: 'Service'
                },
                service_price: {
                    type: Number
                }
            }],
            paid_service: [{
                service: {
                    type: Schema.Types.ObjectId,
                    ref: 'Service'
                },
                service_price: {
                    type: Number
                }
            }]
        }]

    }],
    total_price: {
        type: Number
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Boolean
    },
    customer_booking_status: {
        type: String
    },
    cancellation_date_time: {
        type: Date
    }
}, {
        versionKey: false,
        collection: 'booking'
    })
booking.plugin(timestamps);

module.exports = mongoose.model('Booking', booking)