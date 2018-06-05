var booking = require('../models/booking');
var room = require('../models/room');
var hostel = require('../models/hostel');
var hostelService = require('../services/hostelService');
var roomService = require('../services/roomService');


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
        total_price: bkObj.total_price,
        guest_info: bkObj.guest_info
    }

    return booking
}


/**
 * 
 * @param {*} bkObj 
 *  @param {*} res 
 * Find Availability of rooms
 * Remaining Beds
 * Remaining Room Status
 * Remaining Floor status
 */
function findAvailablility(bkObj, res) {
    var by_hostel = bkObj.room.hostel_id;

    // console.log("by_hostel>>>>", by_hostel);
    var by_room = bkObj.room//original
    var booking_by_floor = bkObj.floors//booking
    var tempRooms = []
    by_room.floors.forEach(byRoom => {
        var floorStatus = true;
        byRoom.rooms.forEach(room => {
            var roomStatus = true;
            var checkStatus = true;
            var floorObject = getFloorById(booking_by_floor, room);
            if (floorObject) {
                var remainingBeds = floorObject.no_of_beds - floorObject.guest;
                if (!isNaN(remainingBeds)) {
                    room.remainingBeds = remainingBeds;
                }

                if (room.remainingBeds == 0) {
                    roomStatus = false;
                    room.remainingBedStatus = "completed"
                } else {
                    roomStatus = true;
                    room.remainingBedStatus = "available"
                }
            }
            byRoom.remainingRoomStatus = roomStatus;
            if (byRoom.remainingRoomStatus == false) {
                floorStatus = false;
            } else {
                floorStatus = true;
            }
            by_room.remainingFloorStatus = floorStatus;
            by_hostel.hostelStatus = by_room.remainingFloorStatus;
            // console.log("room index ============>", tempRooms.findIndex(x => x._id == room.room_id_by_floor))
        })
    })

    roomService.updateRoom(by_room._id, by_room, res);

}


/**
 * 
 * @param {*} floor 
 * @param {*} room
 * Get Floor By Id 
 */
function getFloorById(floor, room) {
    var roomByFloor;
    floor.map(function (val) {
        return val.rooms
    }).forEach(val => {
        // console.log("Room Id ", room_id_by_floor)
        var roomIndexByFloor = val.findIndex(x => x.room_id_by_floor == room._id)
        if (roomIndexByFloor != -1) {
            roomByFloor = val[roomIndexByFloor]
        }
    })
    if (roomByFloor) {
        return roomByFloor
    }
}


/**
 * 
 * @param {*} params 
 * @param {*} res
 * Save Booking 
 */
function saveBooking(params, res) {
    var bookingParam = params
    var bookingDetail = bookingBean(bookingParam)

    var newBooking = new booking(bookingDetail);
    newBooking.save().then(room => {
        findAvailablility(bookingParam, res);
        return res.status(200).json({ 'success': 'Room Booking Successfully', 'data': room });
    }).catch(err => {
        return res.status(400).send("unable to save to database");
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get All Booking Details
 */
function getAllBooking(req, res) {
    booking.find().populate('hostel_id').populate('room_id').exec(function (err, data) {
        if (err) {
            res.json({ message: 'Somthing Wrong', data: err })
        }
        res.json(data)
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} userId 
 * Get Booking Data By User
 */
function getBookingDataByUser(req, res, userId) {
    var query = booking.find();
    query.populate({
        path: 'hostel_id',
        match: { created_by: { $eq: userId } },
        // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
        // select: 'name -_id',
        // options: { limit: 5 }
    })
    query.populate('hostel_id')
    query.populate({ path: 'room_id', populate: { path: 'hostel_id', ref: 'Hostel', populate: { path: 'hostel_services.service', ref: 'Service' } } })
    // query.populate('room_id.hostel_id')
    query.populate({ path: 'room_id', populate: { path: 'hostel_id', ref: 'Hostel',populate: { path: 'images' }}})
    query.populate({ path: 'hostel_id', populate: { path: 'images' } })
    query.populate('floors.rooms.paid_service.service')
    query.exec(function (err, data) {
        if (err) {
            res.json({ message: 'Somthing Wrong', data: err })
        }
        console.log("data>>>>>>", data)
        res.json(data)
    })
}


function updateBooking(req, res, bookingId) {
    console.log("book>>>", req.body)




    var floorData = req.body.floors;
    var roomData = req.body.room_id;
    var hostelData = req.body.hostel_id;
    roomData.floors.forEach(val => {
        var floorStatus = true;
        val.rooms.forEach(room => {
            var roomStatus = true;
            var floorObject = getFloorById(floorData, room);
            if (floorObject) {
                if (floorObject.status == false) {
                    var remainingBeds = room.remainingBeds + floorObject.no_of_beds;
                    if (!isNaN(remainingBeds)) {
                        room.remainingBeds = remainingBeds;
                    }

                    if (room.remainingBeds == 0) {
                        roomStatus = false;
                        room.remainingBedStatus = "completed"
                    } else {
                        roomStatus = true;
                        room.remainingBedStatus = "available"

                    }
                }
            }

            val.remainingRoomStatus = roomStatus
            if (val.remainingRoomStatus == false) {
                floorStatus = false;
            } else {
                floorStatus = true;
            }
            roomData.remainingFloorStatus = floorStatus;
            hostelData.hostelStatus = roomData.remainingFloorStatus;
        })


    })

    // res.json(roomData);
    var roomId = req.body.room_id._id;
    roomService.updateRoom(roomId, roomData, res);
    // hostelService.updateHostelById(hostelData, res, hostelData._id)
    booking.findByIdAndUpdate(bookingId, { $set: req.body }, function (err, data) {
        if (err) {
            console.log(err);
        }
        // console.log("RESULT: " + data);
        else {
            // getBookingDataByUser(req,res,)
        }
    });
    var hostelId = req.body.hostel_id._id;
}

var bookingService = {
    saveBooking, getAllBooking, findAvailablility, getBookingDataByUser, updateBooking
};

module.exports = bookingService;