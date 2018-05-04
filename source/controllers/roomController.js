var bodyParser = require('body-parser');
var roomService = require('../services/roomService')


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Save Rooms
 */
function saveRoom(req, res) {
    console.log("room-->",req.body)
    return roomService.saveRoom(req, res);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get Room Details
 */
function getRoomDetails(req, res) {
    return roomService.getRoomDetails(req, res);
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * Update Room 
 */
function updateRoom(req,res){
    return roomService.updateRoom(req.params.roomId, req.body, res);

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * get RoomDetails ByHostelId
 */
function getRoomDetailsByHostelId(req, res) {
    console.log("params",req.params.hostelId)
    return roomService.getRoomDetailsByHostelId(req.params.hostelId,req, res);
}



var roomController = {
    saveRoom, getRoomDetails,updateRoom,getRoomDetailsByHostelId
};

module.exports = roomController;