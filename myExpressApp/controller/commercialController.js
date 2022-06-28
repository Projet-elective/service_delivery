const orderModel = require('../models/ordersModel');

exports.getAll = async(req, res) => {
    //const logged_user = req.auth;

    orderModel.find({}).populate("idRestaurant").exec(function(err, order) {
        if(err) res.send(err);
        else res.send(order);
    });
};