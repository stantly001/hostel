var multer = require('multer')
var path = require('path');
var bodyParser = require('body-parser');

//Mongoose Models
var room = require('../models/room');


// function filterFloorsData(data){


// data


//     floors: [{
//         no_of_rooms: {
//             type: Number
//         },
//         floor_no: {
//             type: Number
//         },
//         rooms: [{
//             room_services: [{
//                 service: {
//                     type: Schema.Types.ObjectId,
//                     ref: 'Service'
//                 }, 
//                 amount_per_month: Number,
//                 amount_per_day: Number,
//                 amount_per_week: Number,
//                 free_service: Boolean
//             }],
//             is_active: {
//                 type: Boolean
//             },
//             no_of_beds: {
//                 type: Number
//             },
//             room_number: {
//                 type: String
//             },
//             is_active: {
//                 type: Boolean
//             },
//             view_type: {
//                 type: Object
//             }
//         }],
//     }]
// }

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
    var hostel = {
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
        created_by: res.created_by
    };
    return hostel;
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
    console.log("newRoom", newRoom)
    newRoom.save().then(item => {
        console.log("item", item)
        return res.status(200).json({ 'success': 'Room added successfully', 'data': item });
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
