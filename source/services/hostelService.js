var multer = require('multer')
var path = require('path');
var bodyParser = require('body-parser');
var randomstring = require("randomstring");
var fs = require('fs');
//Mongoose Models
var hostel = require('../models/hostel');
var hostelVisuals = require('../models/hostelImg');

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
            return res.json(data);
        }
    })
}
function convertImageUrlTOBase64(imgUrl, res) {
    console.log(imgUrl)

    var url = fs.readFile(imgUrl, (err, data) => {

        //error handle
        if (err) res.status(500).send(err);

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
    var post = new hostel({
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
        checkin_24hrs: res.checkin_24hrs
    });
    return post
}

function filterHostelVisualsModel(res, post) {
    var hostelVisualObj = new hostelVisuals({
        // _id: res._id,
        name: res.name,
        url: res.url,
        hostelId: post._id
    })
    return hostelVisualObj
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 *Save  New Hostel Details and Images
 */
function addHostel(req, res) {
    var post = filterHostelModel(req.body)
    post.save()
        .then(item => {
            req.body.images.forEach(function (val, k) {
                var hostelVisualObj = filterHostelVisualsModel(val, post)
                hostelVisualObj.save(function (err) {
                    if (err) return handleError(err);
                })
                post.images.push(hostelVisualObj)
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
 * 
 * @param {*} req 
 * @param {*} res 
 * Get All Images and Videos
 */
function getAllImagesAndVideos(req, res) {
    hostelVisuals.find().populate("hostelId").exec(function (err, data) {
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
 * Get All Images And Videos By HostelId from HostelImg Collection
 */
function getAllImagesByHostelId(hostelId) {
    console.log(hostelId)
    hostelVisuals.findById({ hostelId: hostelId }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(data);
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


/**
 * 
 * @param {*} id 
 * @param {*} hostelData 
 * @param {*} res 
 *  Update hostelData by HostelId
 */
function updateHostelById(id, req, res) {
    let hostelData = req.body
    var updateData = filterHostelModel(hostelData)
    console.log(id)
    hostel.findByIdAndUpdate(id, updateData, { new: true }).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.hostelId
            });
        }
        if (hostelData.images) {
            hostelData.images.forEach(function (val, k) {
                var hostelVisualObj = filterHostelVisualsModel(res)
                hostelVisuals.findByIdAndUpdate(id, hostelVisualObj, { new: true })
                post.images.push(hostelVisualObj)
            })
        }
        hostel.save()
        return res.json(data)
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.hostelId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.hostelId
        });
    })
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
        }
        else {
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
    getAllHostel, addHostel, onUploadFile, getAllImagesAndVideos,
    getHostelById, updateHostelById, removeHostelById, convertImageUrlTOBase64
};

module.exports = hostelService;
