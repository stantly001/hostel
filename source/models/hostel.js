var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Hostel Items
var Hostel = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  last_updated: {
    type: Date,
    default: Date.now
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  street: {
    type: String
  },
  property_type: {
    type: String
  },
  wheel_chair_accomadate: {
    type: Boolean
  },
  breakfast_included: {
    type: Boolean
  },
  travel_desk: {
    type: Boolean
  },
  hr_checkin: {
    type: Boolean
  },
  air_conditioning: {
    type: Boolean
  },
  internet_acces: {
    type: Boolean
  },
  laundry_service: {
    type: Boolean
  },
  card_payment_accepted: {
    type: Boolean
  },
  locker: {
    type: Boolean
  },
  hot_water: {
    type: Boolean
  },
  water_dispenser: {
    type: Boolean
  },
  common_hangout_area: {
    type: Boolean
  },
  common_television: {
    type: Boolean
  },
  free_breakfast: {
    type: Boolean
  },
  shower: {
    type: Boolean
  },
  free_parking: {
    type: Boolean
  },
  reading_light: {
    type: Boolean
  },
  celing_fan: {
    type: Boolean
  },
  washing_machine: {
    type: Boolean
  },
  house_keeping: {
    type: Boolean
  },
  email: {
    type: String
  },
  url: {
    type: String
  },
  things_to_note: {
    type: String
  },
  cancellation_policy: {
    type: String
  },
  longitude: {
    type: Number
  },
  latitude: {
    type: Number
  },
  language: {
    type: String
  },
  default_currency: {
    type: String
  },
  property_description: {
    type: String
  },
  policy: {
    type: String
  },
  city_rating: {
    type: Number
  },
  state_rating: {
    type: Number
  },
  national_rating: {
    type: Number
  },
  world_rating: {
    type: Number
  },
  checkin_24hrs: {
    type: Boolean
  },
  images: [{
    type: Schema.Types.ObjectId,
    ref: 'HostelImg'
  }]
}, {
    versionKey: false,
    collection: 'hostel'
  });

module.exports = mongoose.model('Hostel', Hostel);