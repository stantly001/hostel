var multer = require('multer')
var path = require('path');
var bodyParser = require('body-parser');

//Mongoose Models
var room = require('../models/room');



/**
 * 
 * @param {*} res 
 * Set Room Data
 */
function setRoomData(res) {
    var roomData = new user({
        floor_no: res.floor_no,
        no_of_rooms: res.no_of_rooms,
        no_of_beds: res.no_of_beds,
        view_type: res.view_type,
        services: res.services
    })
    return roomData;
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Save Room Data
 */
function saveRoom(req, res) {
    var newRoom = setRoomData(req.body);
    newRoom.save().then(item => {
        return res.status(200).json({ 'success': 'user added successfully', 'data': item });
    })
        .catch(err => {
            return res.status(400).send("unable to save to database");
        });
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * Get Room Details 
 */
function getRoomDetails(req, res) {
    room.find().populate("services").exec(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(data);
        }
    })
}

/**
 * 
 * @param {*} id 
 * @param {*} roomData 
 * @param {*} res 
 * update Room
 */
function updateRoom(id, roomData, res) {
    service.findByIdAndUpdate(id, roomData, { new: true })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            return res.status(400).send("unable to save to database");
        });
}

var roomService = {
    saveRoom, getRoomDetails, updateRoom
};

module.exports = roomService;
