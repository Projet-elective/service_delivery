const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    idOwner: Number,
    name: String,
    description: String,
    address: String,
    type: String
});

const restaurantModel = mongoose.model('Restaurant', RestaurantSchema);
module.exports = restaurantModel;