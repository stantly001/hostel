var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HostelImg = new Schema({
    hostelId: {
        type: Schema.Types.ObjectId,
        ref: 'Hostel'
    },
    name: {
        type: String
    },
    url: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
}, {
        versionKey: false,
        collection: 'hostelImg'
    })

module.exports = mongoose.model('HostelImg', HostelImg)