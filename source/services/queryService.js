var hostel = require('../models/hostel');
var room = require('../models/room');
var hs = require('../services/hostelService');
var isEmpty = require('is-empty');
/**
 * 
 * @param {*} params 
 * @param {*} res 
 * Filter By Queries
 */
function findSelectedHostelByQuery(params, res) {
    // Object.keys(params).forEach(function (key) {
    //     console.log(params[key].replace(/"/g, "").split(','))
    // });

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
