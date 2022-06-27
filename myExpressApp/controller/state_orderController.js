const mongoose = require('mongoose');
const orderModel = require('../models/ordersModel');
const restaurantModel = require('../models/restaurantsModel');

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