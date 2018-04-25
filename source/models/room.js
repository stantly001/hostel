var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define collection and schema for Hostel Items
var User = new Schema({
    // _id: Schema.Types.ObjectId,
    floor_no: {
        type: Number
    },
    no_of_rooms: {
        type: Number
    },
    no_of_beds:{
      type:Number
    },
    view_type:{
      type:String
    },
    services:{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }
    
}, {
        versionKey: false,
        collection: 'room'
    });

module.exports = mongoose.model('Room', Room);