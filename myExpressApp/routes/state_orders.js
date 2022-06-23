const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { findByIdAndUpdate } = require('../models/ordersModel');
const orderModel = require('../models/ordersModel');
const restaurantModel = require('../models/restaurantsModel');


router.get('/:id', async (req, res) => {
    const idOrder = req.params.id;
    const logged_user = req.body.user;

    const order = await orderModel.findById(idOrder).populate("idRestaurant");
    if(logged_user != order.idRestaurant.idOwner && logged_user != order.idUser && logged_user != order.deliverer_id) res.send("Vous n'avez pas accès à cette commande.");
    else try {
        res.send(order);
    } catch (err) {
        res.send(err);
    }
});

router.patch('/validateOrder/:id', function(req, res) {
    const idOrder = req.params.id;
    const logged_user = req.body.user;

    orderModel,findByIdAndUpdate(idOrder, {state_order: 'En cours de préparation', accepted_order: true}, function(err, order) {
        if(logged_user != order.idRestaurant.idOwner) {
            res.send("Vous n'êtes pas autorisé à effectuer cette action.");
        } else {
            if(err) res.send(err);
            else res.send("La commande a bien été validée");
        }
        
    });
});

router.patch('/isReadyOrder/:id', function(req, res) {
    const idOrder = req.params.id;
    const logged_user = req.body.user;

    orderModel,findByIdAndUpdate(idOrder, {state_order: 'Commande prête'}, function(err, order) {
        if(logged_user != order.idRestaurant.idOwner) {
            res.send("Vous n'êtes pas autorisé à effectuer cette action.");
        } else {
            if(err) res.send(err);
            else res.send("La commande est prête");
        }   
    });
});

router.patch('/deliverOrder/:id', function(req, res) {
    const idOrder = req.params.id;
    const logged_user = req.body.user;

    orderModel,findByIdAndUpdate(idOrder, {state_order: 'En cours de livraison'}, function(err, order) {
        if(logged_user != order.idRestaurant.idOwner) {
            res.send("Vous n'êtes pas autorisé à effectuer cette action.");
        } else {
            if(err) res.send(err);
            else res.send("La commande est en cours de livraison");
        }
        
    });
});

router.patch('/completeOrder/:id', function(req, res) {
    const idOrder = req.params.id;
    const logged_user = req.body.user;

    orderModel,findByIdAndUpdate(idOrder, {state_order: 'Commande livrée'}, function(err, order) {
        if(logged_user != order.idRestaurant.deliverer_id) {
            res.send("Vous n'êtes pas autorisé à effectuer cette action.");
        } else {
            if(err) res.send(err);
            else res.send("La commande a bien été livrée");
        }  
    });
});

module.exports = router;