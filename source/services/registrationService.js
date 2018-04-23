var multer = require('multer')
var path = require('path');
var bodyParser = require('body-parser');

//Mongoose Models
var user = require('../models/user');



/**
 * 
 * @param {*} res 
 * Set User Data
 */
function setUserData(res) {
    var post = new user({
        user_name: res.user_name,
        email: res.email,
        primary_phone: res.primary_phone,
        secondary_phone: res.secondary_phone,
        gender: res.gender
    })
    post.password = post.generateHash(res.password);
    return post;
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Save User Data
 */
function saveUser(req, res) {
    var newUser = setUserData(req.body);
    newUser.save().then(item => {
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
 * Get User Details 
 */
function getUserDetails(req, res) {
    user.find(function (err, data) {
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
 * @param {*} userName 
 * @param {*} cb 
 * Return Match User Object
 */
function getUserByUserName(userName, cb) {
    user.findOne({ user_name: userName }, function (err, data) {
        return cb(err, data)
    })
}


var registrationService = {
    saveUser, getUserDetails, getUserByUserName
};

module.exports = registrationService;
