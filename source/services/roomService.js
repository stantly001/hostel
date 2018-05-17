var multer = require('multer')
var path = require('path');
var bodyParser = require('body-parser');

//Mongoose Models
var room = require('../models/room');
var hostel = require('../models/hostel');

/**
 * 
 * @param {*} res 
 * Set Room Data
 */
function setRoomData(res) {
    var roomData = new room({
        hostel_id: filterHostelModel(res.hostel_id),//res.hostel_id,
        floors: res.floors,
        created_by: filterCreatedBy(res.created_by)
    })
    return roomData;
}

function filterHostelModel(res) {
    var hostelData = {
        _id: res._id,
        name: res.name,
        country: res.country,
        city: res.city,
        state: res.state,
        street: res.street,
        property_type: res.property_type,
        wheel_chair_accomadate: res.wheel_chair_accomadate,
        breakfast_included: res.breakfast_included,
        travel_desk: res.travel_desk,
        hr_checkin: res.hr_checkin,
        air_conditioning: res.air_conditioning,
        internet_acces: res.internet_acces,
        laundry_service: res.laundry_service,
        card_payment_accepted: res.card_payment_accepted,
        locker: res.locker,
        hot_water: res.hot_water,
        water_dispenser: res.water_dispenser,
        common_hangout_area: res.common_hangout_area,
        common_television: res.common_television,
        free_breakfast: res.free_breakfast,
        shower: res.shower,
        free_parking: res.free_parking,
        reading_light: res.reading_light,
        celing_fan: res.celing_fan,
        washing_machine: res.washing_machine,
        house_keeping: res.house_keeping,
        email: res.email,
        url: res.url,
        things_to_note: res.things_to_note,
        cancellation_policy: res.cancellation_policy,
        longitude: res.longitude,
        latitude: res.latitude,
        language: res.language,
        default_currency: res.default_currency,
        property_description: res.property_description,
        policy: res.policy,
        city_rating: res.city_rating,
        state_rating: res.state_rating,
        national_rating: res.national_rating,
        world_rating: res.world_rating,
        checkin_24hrs: res.checkin_24hrs,
        images: hostelImgs(res.images),
        floors: res.floors,
        hostel_services: res.hostel_services,
        room_type: res.room_type,
        available_service: res.available_service,
        created_by: res.created_by
    };
    return hostelData;
}

function hostelImgs(imgs) {
    var imgsData = []
    var returnImgs = imgs.map(img => {
        return img
    }).forEach(ele => {
        var returnData = {
            _id: ele._id,
            name: ele.name,
            url: ele.url,
            hostelId: ele.hostelId
        }
        imgsData.push(returnData)
    });
    return imgsData
}

function filterCreatedBy(data) {
    if (data._id) {
        return data
    } else {
        return ''
    }
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
        return res.status(200).json({ 'success': 'Room added successfully', 'data': item });
    }).catch(err => {
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
    room.find().populate("hostel_id").populate("floors.rooms.services").exec(function (err, data) {
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
 * @param {*} hostelId 
 * @param {*} req 
 * @param {*} res 
 * Get RoomDetails ByHostelId
 */
function getRoomDetailsByHostelId(hostelId, req, res) {
    console.log("hostelId-->", hostelId)
    room.findOne({ hostel_id: hostelId }).populate("hostel_id").populate("created_by").populate("floors.rooms.room_services.service").exec(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("data-->", data)
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
    var temp_service = [];
    var temp_room_type = []
    if (roomData.floors) {
        roomData.floors.map(room => {
            return room.rooms.map(service => {
                if (temp_room_type.indexOf(service.room_type) == -1) {
                    temp_room_type.push(service.room_type)
                    // console.log(roomData.hostel_id.room_type.find(type => type.type_name === service.room_type))
                    let roomType = roomData.hostel_id.room_type.find(type => type.type_name === service.room_type)
                    if (!roomType.type_name) {
                        roomData.hostel_id.room_type.push({ type_name: service.room_type })
                    }
                }
                return service.room_services.map(val => {
                    if (temp_service.indexOf(val.service.service_name) == -1) {
                        temp_service.push(val.service.service_name)
                        // console.log(roomData.hostel_id.available_service.find(service => service.service_name === val.service.service_name))
                        let availabelService = roomData.hostel_id.available_service.find(service => service.service_name === val.service.service_name)
                        if (!availabelService.service_name) {
                            roomData.hostel_id.available_service.push({ service_name: val.service.service_name })
                        }
                    }
                })
            })
        })
    }
    hostel.findByIdAndUpdate(roomData.hostel_id._id, roomData.hostel_id, { new: true })
        .then(data => {
            // console.log(data)
        })
        .catch(err => console.log(err))

    room.findByIdAndUpdate(id, roomData, { new: true })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            return res.status(400).send("unable to save to database");
        });
}

var roomService = {
    saveRoom, getRoomDetails, updateRoom, getRoomDetailsByHostelId
};

module.exports = roomService;
