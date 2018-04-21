var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Hostel Items
var UserSchema = new Schema({
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



//   UserSchema.pre('save', function (next) {
//     var user = this;
//     bcrypt.hash(user.password, 10, function (err, hash){
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     })
//   });
module.exports = mongoose.model('user', UserSchema);