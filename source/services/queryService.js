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
                return {
                    images: items.images.map(img => {
                        return {
                            _id: img._id,
                            url: img.url,
                            imgBase64: hs.getImgToBase64ByHostel(img.url),
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

function removeSpecialChar(data) {
    if (data) {
        return data.replace(/"/g, "").split(',')
    } else {
        return
    }
}

var queryService = { findSelectedHostelByQuery };

module.exports = queryService;
