var bookingService = require('../services/bookingService')

function saveBooking(req, res) {
    var booking_detail = req.body
    return bookingService.saveBooking(booking_detail, res)
}

function getAllBooking(req, res) {
    return bookingService.getAllBooking(req, res)
}

var bookingController = {
    saveBooking, getAllBooking
}

module.exports = bookingController