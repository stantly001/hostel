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
        total_price: bkObj.total_price
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
            console.log("floorObject>>>>>", floorObject)
            if (floorObject) {
                checkStatus = false;
                var remainingBeds = floorObject.no_of_beds - floorObject.guest;
                console.log("guest>>>>>>", floorObject.guest)
                if (!isNaN(remainingBeds)) {
                    room.remainingBeds = remainingBeds;
                }

                if (room.remainingBeds == 0) {
                    console.log("11111")
                    roomStatus = false;
                    room.remainingBedStatus = "completed"
                } else {
                    console.log("22222")
                    roomStatus = true;
                    room.remainingBedStatus = "available"
                }
                console.log("room$$$$$", room)

            }
            console.log("roomStatus", roomStatus)
            if (checkStatus == false) {
                byRoom.remainingRoomStatus = roomStatus;
            }
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
    //    hostelService.updateHostelById(by_hostel, res, by_hostel._id)
    // console.log("byRoom", by_room)
    // console.log("by room =====> ", by_room.floors)
    // booking_by_floor.forEach(floor => {

    // console.log("floor>>>>",floor)



    //  });

}

function getFloorById(floor, room) {
    var roomByFloor;
    floor.map(function (val) {
        return val.rooms
    }).forEach(val => {
        // console.log("Room Id ", room_id_by_floor)
        var roomIndexByFloor = val.findIndex(x => x.room_id_by_floor == room._id)
        console.log("Room Index  ", roomIndexByFloor)
        if (roomIndexByFloor != -1) {
            console.log("Room-->>>.  ", val[roomIndexByFloor])
            roomByFloor = val[roomIndexByFloor]
        }
    })
    console.log("Find roomByFloor :: ", roomByFloor)
    if (roomByFloor) {
        return roomByFloor
    }
}



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

function getAllBooking(req, res) {
    booking.find().populate('hostel_id').populate('room_id').exec(function (err, data) {
        if (err) {
            res.json({ message: 'Somthing Wrong', data: err })
        }
        res.json(data)
    })
}


function getBookingDataByUser(req,res,userId){
    console.log("sddfdfd>>>",userId)
    // getAllBooking(req,res);
    var query=booking.find();
    // query.where('created_by').equals(userId);
    // console.log("created_by>>>>",query.where('hostel_id.created_by').equals(userId))
    query.populate({
        path: 'hostel_id',
        match: { created_by: { $eq: userId }},
        // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
        // select: 'name -_id',
        // options: { limit: 5 }
      })
      query.populate('hostel_id')
      query.populate('room_id')
    query.exec(function (err, data) {
        if (err) {
            res.json({ message: 'Somthing Wrong', data: err })
        }
        console.log("data>>>>>>",data)
        res.json(data)
    })
}

var bookingService = {
    saveBooking, getAllBooking, findAvailablility,getBookingDataByUser
};

module.exports = bookingService;