var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define collection and schema for Hostel Items
var Room = new Schema({
    // _id: Schema.Types.ObjectId,
    hostel_list: {
        type: Schema.Types.ObjectId,
        ref: 'Hostel'
    },
    floor: {
        type: Number
    },
    no_of_rooms: {
        type: Number
    },
    
   rooms:[{
    services:[{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }],
    is_active:{
        type:Boolean
    },
    no_of_beds: {
        type: Number
    },
    room_number:{
        type: Number
    },
    is_active:{
        type:Boolean
    },
    view_type:{
        type:Object
    }
}],
    
}, {
        versionKey: false,
        collection: 'room'
    });

module.exports = mongoose.model('Room', Room);