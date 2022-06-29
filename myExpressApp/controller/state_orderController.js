const mongoose = require('mongoose');
const orderModel = require('../models/ordersModel');

/**
 * @api {get} /:id Get the state of the order by ID
 * @apiName get
 * @apiGroup State_order
 * @apiParam {Object} id of the order and information of the authentificated user
 * @apiSuccess {Object} Return the order
 * @apiError err Return the error
 */
// Get the state of the order by ID
exports.get = async(req, res) => {
    const idOrder = req.params.id;
    const logged_user = req.auth;

    const order = await orderModel.findById(idOrder).populate("idRestaurant");
    if(logged_user.userId != order.idRestaurant.idOwner && logged_user != order.idUser && logged_user != order.deliverer_id) res.send("Vous n'avez pas accès à cette commande.");
    else try {
        res.send(order);
    } catch (err) {
        res.send(err);
    }
};

/**
 * @api {patch} /validateOrder/:id Validate the selected order
 * @apiName validate
 * @apiGroup State_order
 * @apiParam {Object} id of the order and information of the authentificated user
 * @apiSuccess {String} Return "La commande a bien été validée"
 * @apiError err Return the error
 */
// Validate the order by the restaurant
exports.validate = function(req, res) {
    const idOrder = req.params.id;
    const logged_user = req.auth;

    orderModel.findByIdAndUpdate(idOrder, {state_order: 'En cours de préparation', accepted_order: true}).populate("idRestaurant").exec(function (err, order) {
        if(logged_user.userId != order.idRestaurant.idOwner) {
            res.send("Vous n'êtes pas autorisé à effectuer cette action.");
            res.send(order.idRestaurant.idOwner);
        } else {
            if(err) res.send(err);
            else res.send("La commande a bien été validée");
        }
        
    });
};

/**
 * @api {patch} /isReadyOrder/:id Validate the selected order
 * @apiName isReady
 * @apiGroup State_order
 * @apiParam {Object} id of the order and information of the authentificated user
 * @apiSuccess {String} Return "La commande est prête"
 * @apiError err Return the error
 */
// Change the state of the order to Ready
exports.isReady = function(req, res) {
    const idOrder = req.params.id;
    const logged_user = req.auth;

    orderModel.findByIdAndUpdate(idOrder, {state_order: 'Commande prête'}).populate("idRestaurant").exec(function (err, order) {
        if(logged_user.userId != order.idRestaurant.idOwner) {
            res.send("Vous n'êtes pas autorisé à effectuer cette action.");
        } else {
            if(err) res.send(err);
            else res.send("La commande est prête");
        }   
    });
};

/**
 * @api {patch} /deliverOrder/:id Validate the selected order
 * @apiName deliver
 * @apiGroup State_order
 * @apiParam {Object} id of the order and information of the authentificated user
 * @apiSuccess {String} Return "La commande est en cours de livraison"
 * @apiError err Return the error
 */
// Change the state of the order to Delivering
exports.deliver = function(req, res) {
    const idOrder = req.params.id;
    const logged_user = req.auth;

    orderModel.findByIdAndUpdate(idOrder, {state_order: 'En cours de livraison'}).populate("idRestaurant").exec(function (err, order) {
        if(logged_user.userId != order.idRestaurant.idOwner) {
            res.send("Vous n'êtes pas autorisé à effectuer cette action.");
        } else {
            if(err) res.send(err);
            else res.send("La commande est en cours de livraison");
        }
        
    });
};

/**
 * @api {patch} /completeOrder/:id Validate the selected order
 * @apiName complete
 * @apiGroup State_order
 * @apiParam {Object} id of the order and information of the authentificated user
 * @apiSuccess {String} Return "La commande a bien été livrée"
 * @apiError err Return the error
 */
// Change the state of the order to Completed
exports.complete = function(req, res) {
    const idOrder = req.params.id;
    const logged_user = req.auth;

    orderModel.findByIdAndUpdate(idOrder, {state_order: 'Commande livrée'}, function(err, order) {
        if(logged_user.userId != order.deliverer_id) {
            res.send("Vous n'êtes pas autorisé à effectuer cette action.");
        } else {
            if(err) res.send(err);
            else res.send("La commande a bien été livrée");
        }  
    });
};