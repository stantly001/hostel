var booking = require('../models/booking');
var room = require('../models/room');
var hostel = require('../models/hostel')

function saveBooking(params, res) {
    var bookingDetail = params
    var newBooking = new booking(bookingDetail);
    newBooking.save().then(room => {
        return res.status(200).json({ 'success': 'Room Booking Successfully', 'data': room });
    }).catch(err => {
        return res.status(400).send("unable to save to database");
    });
}

function getAllBooking(res) {
    booking.find().exec(function (err, data) {
        if (err) {
            res.json({ message: 'Somthing Wrong', data: err })
        }
        res.json(data)
    })
}

var bookingService = {
    saveBooking, getAllBooking
};

module.exports = bookingService;