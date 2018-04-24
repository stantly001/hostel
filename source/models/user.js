var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
// Define collection and schema for Hostel Items
var User = new Schema({
    // _id: Schema.Types.ObjectId,
    user_name: {
        type: String,
        // unique: true,
        // required: true,
        // trim: true
    },
    email: {
        type: String,
        // unique: true,
        // required: true,
        // trim: true
    }, primay_phone: {
        type: Number
    }, secondary_phone: {
        type: Number
    }, password: {
        type: String,
        // required: true,
        // trim: true
    },
    gender: {
        type: String
    }

}, {
        versionKey: false,
        collection: 'user'
    });


    User.methods.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };
    
    // checking if password is valid
    User.methods.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

module.exports = mongoose.model('User', User);