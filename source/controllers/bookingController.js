var bookingService = require('../services/bookingService')

function saveBooking(req, res) {
    var booking_detail = req.body
    return bookingService.saveBooking(booking_detail, res)
}

function getAllBooking(req, res) {
    return bookingService.getAllBooking(req, res)
}
function getBookingDataByUser(req, res) {
    return bookingService.getBookingDataByUser(req, res, req.params.userId)
}

function updateBooking(req, res) {
    return bookingService.updateBooking(req, res, req.params.bookingId);
}
var bookingController = {
    saveBooking, getAllBooking, getBookingDataByUser, updateBooking
}

module.exports = bookingController