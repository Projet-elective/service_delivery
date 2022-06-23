const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const OrderSchema = new mongoose.Schema({
    idRestaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    idUser:String,
    orderList: Array,
    accepted_order:Boolean,
    state_order:String,
    deliverer_id: String,
    delivery_address: String
});

const orderModel = mongoose.model ('Order', OrderSchema);
module.exports = orderModel;