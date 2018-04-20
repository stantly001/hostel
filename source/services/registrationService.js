

var multer = require('multer')
var path = require('path');
var bodyParser = require('body-parser');
var randomstring = require("randomstring");
var fs = require('fs');
//Mongoose Models
var user = require('../models/user');



/**
 * 
 * @param {*} res 
 * Set User Data
 */
function setUserData(res){
var post=new user({
    user_name:res.user_name,
    email:res.email,
    primary_phone:res.primary_phone,
    secondary_phone:res.secondary_phone,
    password:res.password
})
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Save User Data
 */
function saveUser(req, res) {
    var post =setUserData(res)
    post.save().then(item => {
        return res.status(200).json({ 'success': 'user added successfully', 'data': post });
    })
    .catch(err => {
        return res.status(400).send("unable to save to database");
    });
}
