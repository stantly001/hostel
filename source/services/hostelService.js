var multer = require('multer');
var path = require('path');
var bodyParser = require('body-parser');
var randomstring = require("randomstring");
// var fs = require('fs');
var base64Img = require('base64-img');
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
    console.log("session------>", req.session.id);

    hostel.find().populate("images")
        .populate("created_by")
        .populate("hostel_services.service")
        .exec(function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var returnData = data.map(items => {
                    return {
                        images: items.images.map(img => {
                            return {
                                _id: img._id,
                                url: img.url,
                                imgBase64: getImgToBase64ByHostel(img.url),
                                name: img.name,
                                hostelId: img.hostelId
                            }
                        }),
                        created: items.created,
                        last_updated: items.last_updated,
                        hostel_services: items.hostel_services,
                        _id: items._id,
                        name: items.name,
                        country: items.country,
                        city: items.city,
                        state: items.state,
                        street: items.street,
                        email: items.email,
                        longitude: items.longitude,
                        latitude: items.latitude,
                        language: items.language,
                        property_type: items.property_type,
                        url: items.url,
                        things_to_note: items.things_to_note,
                        cancellation_policy: items.cancellation_policy,
                        default_currency: items.default_currency,
                        property_description: items.property_description,
                        policy: items.policy,
                        checkin_24hrs: items.checkin_24hrs,
                        floors: items.floors,
                        available_service: items.available_service,
                        room_type: items.room_type
                    }
                })
                return res.json(returnData);
            }
        })
}


/**
 * 
 * @param {*} imgUrl 
 */
function getImgToBase64ByHostel(imgUrl) {

    let imgSrcString = convertBase64(imgUrl)
    return imgSrcString
}


/**
 * 
 * @param {*} imgUrl 
 * @param {*} url 
 * Convert Base64
 */
function convertBase64(imgUrl) {
    var imgSrcString = ''
    if (imgUrl) {
        imgSrcString = base64Img.base64Sync(imgUrl);
    }
    // let extensionName = path.extname(imgUrl);
    // //convert image file to base64-encoded string
    // let base64Image = new Buffer(url, 'binary').toString('base64');
    // //combine all strings
    // let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
    return imgSrcString
}

/**
 * 
 * @param {*} imgUrl 
 * @param {*} res 
 * Image Response
 */
function convertImageUrlTOBase64(imgUrl, res) {
    // var url = fs.readFile(imgUrl, (err, data) => {
    //     if (err)
    //         res.status(500).send(err);
    let imgSrcString = convertBase64(imgUrl)
    res.send(imgSrcString)
    // })
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
        floors: res.floors,
        hostel_services: res.hostel_services,
        created_by: res.created_by,
        available_service: res.available_service,
        room_type: res.room_type
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
            return res.status(200).json({ 'message': 'Hostel added successfully', 'data': post });
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
            console.log(err);
            return res.end("Something went wrong!");
        }
        return res.status(200).json({ "success": "File uploaded sucessfully!.", data: imgObj });
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
    hostelVisuals.findById({ hostelId: hostelId }, function (err, data) {
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
    // hostel.findById(id, function (err, data) {
    //     if (err) {
    //         return res.send(err);
    //     } else {
    //         console.log("data",data)
    //         return res.json(data);
    //     }
    // });
    hostel.findOne({ _id: id }).populate("hostel_services.service").exec(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(data);
        }
    })
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
    data.hostel_services = res.hostel_services;
    data.floors = res.floors;
    data.created_by = res.created_by;
    data.available_service = res.available_service;
    data.room_type = res.room_type
    // }

    return data;
}

function updateHostelVisualsModel(res) {
    var hostelVisualObj = new hostelVisuals({
        _id: res._id,
        name: res.name,
        url: res.url,
        hostelId: res.hostelId
    });
    return hostelVisualObj;
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
            var tempImg = []
            data = updateFilterHostelDetail(data, hostelData);
            data.images = []
            hostelData.images.map(function (val, k) {
                var hostelVisualObj = updateHostelVisualsModel(val)
                if (val._id) {
                    var imgQuery = { '_id': val._id }
                    hostelVisuals.update(imgQuery, hostelVisualObj, { upsert: true })
                } else {
                    hostelVisualObj.save()
                }
                return hostelVisualObj
            }).forEach(item => {
                if (tempImg.indexOf(item._id) == -1) {
                    tempImg.push(item._id)
                    data.images.push(item)
                }
            })
            hostel.findByIdAndUpdate({ '_id': id }, data, { upsert: true }, function (err, doc) {
                res.send(doc)
            })
            data.images = [];
            tempImg = []
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
    hostel.findByIdAndRemove({ _id: id }, function (err, data) {
        if (err) {
            res.json(err);
        } else {
            var returnHostelImg = getAllImagesByHostelId(id);
            if (returnHostelImg) {
                returnHostelImg.forEach(function (val, key) {
                    removeHostelImgById(val._id)
                })
            }
            res.json({ 'success': 'Successfully removed', 'data': data });
        }
    });
}

/**
 * 
 * @param {*} hostelImgId
 * Remove HostelImg By HostelImg Id
 */
function removeHostelImgById(hostelImgId) {
    hostel.findByIdAndRemove({ _id: id }, function (err, data) {
        return res.json({ 'success': 'Successfully removed', 'data': data });
    })
}

var hostelService = {
    getAllHostel, addHostel, onUploadFile, getAllImagesAndVideos, getImgToBase64ByHostel,
    getHostelById, updateHostelById, removeHostelById, convertImageUrlTOBase64
};

module.exports = hostelService;
