const orderModel = require('../models/ordersModel');
const restaurantModel = require('../models/restaurantsModel');

/**
 * @api {get} /processingOrders Get all the orders that are not yet delivered
 * @apiName proccesingOrders
 * @apiGroup Commercial
 * @apiParam {Object} information of the authentificated user
 * @apiSuccess {Object} Return the orders
 * @apiError err Return the error
 */
// Get all the orders that are not yet delivered
exports.getAll = async(req, res) => {
    const logged_user = req.auth;
    const orders = await orderModel.find({state_order: {$ne: "Commande livrée"}}).populate("idRestaurant");

    if(logged_user.role != "COMMERCIAL ") {
        res.send("Vous n'êtes pas autorisé à accèder à ces données.")
    } else {
        try {
            res.send(orders);
        } catch (err) {
            res.send(err);
        }
    }
};