var multer = require('multer')
var path = require('path');
var bodyParser = require('body-parser');
var randomstring = require("randomstring");
var fs = require('fs');
//Mongoose Models
var hostel = require('../models/hostel');
var hostelVisuals = require('../models/hostelImg');
var service = require('../models/service');

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
//    hostel.find().populate("images").populate("hostelServices.service").exec(function (err, data) {
    hostel.find().populate("images")
    .populate("created_by")
    .populate({path: 'hostel_services', populate:[{path: 'service', model: 'Service'}]}).exec(function (err, data) {
        if (err) {
            console.log(err);
        } else {                     
            return res.json(data);
        }
    })
}

/**
 * 
 * @param {*} imgUrl 
 * @param {*} res 
 * Image Response
 */
function convertImageUrlTOBase64(imgUrl, res) {
    console.log(imgUrl)

    var url = fs.readFile(imgUrl, (err, data) => {
        //error handle
        if (err)
            res.status(500).send(err);
        //get image file extension name
        let extensionName = path.extname(imgUrl);
        //convert image file to base64-encoded string
        let base64Image = new Buffer(data, 'binary').toString('base64');
        //combine all strings
        let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
        res.send(imgSrcString)
    })
}



/**
 * 
 * @param {*} res 
 * Filter By hostel obj
 */
function filterHostelModel(res) {
    var hostel = {
        // _id: res._id,
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
        floors:res.floors,
        hostel_services:res.hostel_services,
        created_by:res.created_by
    };
    return hostel;
}

/**
 * 
 * @param {*} res 
 * @param {*} post 
 * Filter By Hostel Visuals
 */
function filterHostelVisualsModel(res, post) {
    console.log("Hostel Id ====> ", post._id)
    var hostelVisualObj = new hostelVisuals({
        name: res.name,
        url: res.url,
        hostelId: post._id
    });
    return hostelVisualObj;
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 *Save  New Hostel Details and Images
 */
function addHostel(req, res) {
    var post = new hostel(filterHostelModel(req.body))
    console.log(post)
    post.save()
            .then(item => {
                req.body.images.forEach(function (val, k) {
                    var hostelVisualObj = filterHostelVisualsModel(val, post)
                    hostelVisualObj.save(function (err) {
                        if (err)
                            return handleError(err);
                    })
                    post.images.push(hostelVisualObj)
                })
                post.save();
                return res.status(200).json({'message': 'Hostel added successfully', 'data': post});
            })
            .catch(err => {
                return res.status(400).send("unable to save to database");
            });
}


//Image and Video Storage
var imgObj = {};
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, imgFilePath);
    },
    filename: function (req, file, callback) {
        var imgFileName = file.fieldname + "_" + randomstring.generate() + "_" + file.originalname;
        imgObj.name = file.originalname;
        imgObj.url = imgFilePath + '/' + imgFileName;
        callback(null, imgFileName);
    }
});

var upload = multer({storage: Storage}).array("image", 3);

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Save Image from Directory
 */
function onUploadFile(req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Something went wrong!");
        }
        return res.status(200).json({"success": "File uploaded sucessfully!.", data: imgObj});
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get All Images and Videos
 */
function getAllImagesAndVideos(req, res) {
    hostelVisuals.find().populate("hostelId").exec(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            return res.json(data);
        }
    })
}


/**
 * 
 * @param {*} hostelId 
 * Get All Images And Videos By HostelId from HostelImg Collection
 */
function getAllImagesByHostelId(hostelId) {
    hostelVisuals.findById({hostelId: hostelId}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            return data;
        }
    });
}


/**
 * 
 * @param {*} id 
 * @param {*} res 
 * Get Hostel Details By hostelId
 */
function getHostelById(id, res) {
    hostel.findById(id, function (err, data) {
        if (err) {
            return res.send(err);
        } else {
            return res.json(data);
        }
    });
}

function updateFilterHostelDetail(data, res) {
    // var updateFilterHostel = {
    data.name = res.name;
    data.country = res.country;
    data.city = res.city;
    data.state = res.state;
    data.street = res.street;
    data.property_type = res.property_type;
    data.wheel_chair_accomadate = res.wheel_chair_accomadate;
    data.breakfast_included = res.breakfast_included;
    data.travel_desk = res.travel_desk;
    data.hr_checkin = res.hr_checkin;
    data.air_conditioning = res.air_conditioning;
    data.internet_acces = res.internet_acces;
    data.laundry_service = res.laundry_service;
    data.card_payment_accepted = res.card_payment_accepted;
    data.locker = res.locker;
    data.hot_water = res.hot_water;
    data.water_dispenser = res.water_dispenser;
    data.common_hangout_area = res.common_hangout_area;
    data.common_television = res.common_television;
    data.free_breakfast = res.free_breakfast;
    data.shower = res.shower;
    data.free_parking = res.free_parking;
    data.reading_light = res.reading_light;
    data.celing_fan = res.celing_fan;
    data.washing_machine = res.washing_machine;
    data.house_keeping = res.house_keeping;
    data.email = res.email;
    data.url = res.url;
    data.things_to_note = res.things_to_note;
    data.cancellation_policy = res.cancellation_policy;
    data.longitude = res.longitude;
    data.latitude = res.latitude;
    data.language = res.language;
    data.default_currency = res.default_currency;
    data.property_description = res.property_description;
    data.policy = res.policy;
    data.city_rating = res.city_rating;
    data.state_rating = res.state_rating;
    data.national_rating = res.national_rating;
    data.world_rating = res.world_rating;
    data.checkin_24hrs = res.checkin_24hrs;
    hostel_services:res.hostel_services;
    floors:res.floors;
    created_by:res.created_by
    // }

    return data;
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 *  Update hostelData by HostelId
 */
function updateHostelById(req, res, id) {
    let hostelData = req.body;

    hostel.findById(id, function (err, data) {
        if (!data)
            return next(new Error('Could not load Document'));
        else {
            data = updateFilterHostelDetail(data, hostelData);
            hostelData.images.forEach(function (val, k) {
                var hostelVisualObj = filterHostelVisualsModel(val, hostelData)
                if (val._id) {
                    hostelVisuals.update({_id: val._id}, hostelVisualObj)
                } else {
                    hostelVisualObj.save()
                }
                data.images.push(hostelVisualObj)
            })
            data.save().then(coin => {
                res.json({'message': 'Update complete', 'data': data});
            })
                    .catch(err => {
                        res.status(400).send("unable to update the database");
                    });
        }
    });
}


/**
 * 
 * @param {*} id 
 * @param {*} res
 * Remove Hostel Obj By Id from hostel Collection And Remove ref Collection of hostelImg 
 */
function removeHostelById(id, res) {
    hostel.findByIdAndRemove({_id: id}, function (err, data) {
        if (err) {
            res.json(err);
        } else {
            var returnHostelImg = getAllImagesByHostelId(id);
            if (returnHostelImg) {
                returnHostelImg.forEach(function (val, key) {
                    removeHostelImgById(val._id)
                })
            }
            res.json({'success': 'Successfully removed', 'data': data});
        }
    });
}

/**
 * 
 * @param {*} hostelImgId
 * Remove HostelImg By HostelImg Id
 */
function removeHostelImgById(hostelImgId) {
    hostel.findByIdAndRemove({_id: id}, function (err, data) {
        return res.json({'success': 'Successfully removed', 'data': data});
    })
}

var hostelService = {
    getAllHostel, addHostel, onUploadFile, getAllImagesAndVideos,
    getHostelById, updateHostelById, removeHostelById, convertImageUrlTOBase64
};

module.exports = hostelService;
