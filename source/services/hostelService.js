var multer = require('multer')
var path = require('path');
var bodyParser = require('body-parser');
var randomstring = require("randomstring");

//Mongoose Models
var hostel = require('../models/hostel');
var hostelImg = require('../models/hostelImg');

//File Path
const imgFilePath = "../hmsDoc/visuals";
// const videoFilePath = "../hmsDoc/videos";


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get All Hostel Details
 */
function getAllHostel(req, res) {
    hostel.find().populate("images").exec(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data)
            return res.json(data);
        }
    })
    // hostel.find(function (err, data) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         return res.json(data);
    //     }
    // })
}


/**
 * 
 * @param {*} res 
 * Filter By hostel obj
 */
function filterHostelModel(res) {
    var post = new hostel({
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
        checkin_24hrs: res.checkin_24hrs
    });
    return post
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 *Save  New Hostel Details and Images
 */
function addHostel(req, res) {
    var post = filterHostelModel(req.body)

    // post.save(function (err) {
    //     if (err) return handleError(err);

    //     var hostelImgObj = new hostelImg({
    //         name: req.body.images.name,
    //         url: req.body.images.url,
    //         hostelId: post._id
    //     })

    //     hostelImgObj.save(function (err) {
    //         if (err) return handleError(err);
    //         // thats it!
    //     });
    //     //then add story to person
    //     post.images = hostelImgObj
    //     // aaron.stories.push(story1);
    //     post.save();
    // });
    post.save()
        .then(item => {
            req.body.images.forEach(function (val, k) {
                var hostelImgObj = new hostelImg({
                    name: val.name,
                    url: val.url,
                    hostelId: post._id
                })
                hostelImgObj.save(function (err) {
                    if (err) return handleError(err);
                })
                post.images.push(hostelImgObj)
            })
            post.save()
            return res.status(200).json({ 'success': 'Hostel added successfully', 'data': post });
        })
        .catch(err => {
            return res.status(400).send("unable to save to database");
        });
}


//Image and Video Storage
var imgObj = {}
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, imgFilePath);
    },
    filename: function (req, file, callback) {
        var imgFileName = file.fieldname + "_" + randomstring.generate() + "_" + file.originalname
        imgObj.name = file.originalname;
        imgObj.url = imgFilePath + '/' + imgFileName
        callback(null, imgFileName);
    }
});

var upload = multer({ storage: Storage }).array("image", 3);

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Save Image from Directory
 */
function onUploadFile(req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err)
            return res.end("Something went wrong!");
        }
        return res.status(200).json({ "success": "File uploaded sucessfully!.", data: imgObj });
    });
}


/**
 * Get All Images and Videos
 */
function getAllImagesAndVideos(req, res) {
    hostelImg.find().populate("hostelId").exec(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(data);
        }
    })
}

function getAllImagesByHostelId(hostelId) {
    console.log(hostelId)
    hostelImg.findById({ hostelId: hostelId }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(data);
        }
        // author.save(function(err) {
        //     if (err) throw err;

        //     console.log('Author updated successfully');
        // });
    });
}


var hostelService = { getAllHostel, addHostel, onUploadFile, getAllImagesAndVideos };

module.exports = hostelService;