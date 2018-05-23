var hostel = require('../models/hostel');
var room = require('../models/room');
var hs = require('../services/hostelService');
var isEmpty = require('is-empty');
// var smsTwilio = require('twilio');
/**
 * 
 * @param {*} params 
 * @param {*} res 
 * Filter By Queries
 */





function findSelectedHostelByQuery(params, res) {
    //var client = smsTwilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);//


    // var client = new smsTwilio('ACe0ae3f23dcb9e985e8a7ba34cc95bbfb', '5aed905241510a6d5bcddc26972cf611');
    
    
    // console.log("Client Id", client)
    // // Send the text message.
    // client.sendSms({
    //     to: '+919952790466',
    //     from: '+19045310815',
    //     body: 'Hello from Twilio!'
    // });

    // client.api.messages
    //     .create({
    //         body: 'Hello from Twilio!',
    //         to: '+919952790466',
    //         from: '+19045310815',
    //     }).then(function (data) {
    //         console.log('Administrator notified');
    //     }).catch(function (err) {
    //         console.error('Could not notify administrator');
    //         console.error(err);
    //     });

    var roomType = removeSpecialChar(params['Room Type'])
    var roomService = removeSpecialChar(params['Room Services'])
    var country = params['country']
    var city = params['city']
    var price = {}

    if (params['priceMin'] && params['priceMax']) {
        price = { min: params['priceMin'], max: params['priceMax'] }
    }

    var query = hostel.find()
    if (country) {
        query.where('country').equals(country)
    }
    if (city) {
        query.where('city').equals(city)
    }
    if (roomType) {
        query.where('room_type.type_name').in(roomType)
    }
    if (!isEmpty(price)) {
        query.where('hostel_services.base_amount').gte(price.min).lte(price.max)
    }
    if (roomService) {
        query.where('available_service.service_name').in(roomService)
    }

    query.populate('images')
    query.populate('hostel_services.service')
    query.exec(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            var returnData = doc.map(items => {
                return hs.setHostelDetails(items)
            })
            return res.json(returnData);
        }
    })
}

function removeSpecialChar(data) {
    if (data) {
        return data.replace(/"/g, "").split(',')
    } else {
        return
    }
}

var queryService = { findSelectedHostelByQuery };

module.exports = queryService;
