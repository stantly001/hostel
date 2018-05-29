var booking = require('../models/booking');
var room = require('../models/room');
var hostel = require('../models/hostel')


/**
 * 
 * @param {*} bkObj 
 * Booking
 */
function bookingBean(bkObj) {
    var booking = {
        hostel_id: bkObj.room.hostel_id._id,
        room_id: bkObj.room._id,
        floors: bkObj.floors,
        total_price: bkObj.total_price
    }

    return booking
}

function findAvailableHostel(bkObj) {
    var by_hostel = bkObj.room.hostel_id;
    var by_room = bkObj.room
    var booking_by_floor = bkObj.floors
    var tempRooms = []

    by_room.floors.forEach(byRoom => {
        return tempRooms.push(byRoom.rooms)
    })

    // console.log("by room =====> ", by_room.floors)
    booking_by_floor.forEach(floor => {
        floor.rooms.forEach(room => {

            console.log("room index ============>", tempRooms, tempRooms.findIndex(x => x._id == room.room_id_by_floor))
        })
    });

}



function saveBooking(params, res) {
    var bookingParam = params
    var bookingDetail = bookingBean(bookingParam)

    findAvailableHostel(bookingParam)




    // console.log(bookingDetail)








    // return;


    var newBooking = new booking(bookingDetail);
    newBooking.save().then(room => {
        return res.status(200).json({ 'success': 'Room Booking Successfully', 'data': room });
    }).catch(err => {
        return res.status(400).send("unable to save to database");
    });
}

function getAllBooking(req, res) {
    booking.find().populate('hostel_id').populate('room_id').exec(function (err, data) {
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