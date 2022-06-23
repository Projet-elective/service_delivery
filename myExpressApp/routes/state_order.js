const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { findByIdAndUpdate } = require('../models/ordersModel');
const orderModel = require('../models/ordersModel');


router.get('/:id', function(req, res) {
    const idOrder = req.params.id;

    orderModel.findById(idOrder, function(err, order) {
        if(err) res.send(err);
        else res.send(order);
    });
})

router.patch('/validateOrder/:id', function(req, res) {
    const idOrder = req.params.id;

    orderModel,findByIdAndUpdate(idOrder, {state_order: 'En cours de préparation', accepted_order: true}, function(err, order) {
        if(err) res.send(err);
        else res.send("La commande a bien été validée");
    });
});

router.patch('/isReadyOrder/:id', function(req, res) {
    const idOrder = req.params.id;

    orderModel,findByIdAndUpdate(idOrder, {state_order: 'Commande prête'}, function(err, order) {
        if(err) res.send(err);
        else res.send("La commande est prête");
    });
});

router.patch('/deliverOrder/:id', function(req, res) {
    const idOrder = req.params.id;

    orderModel,findByIdAndUpdate(idOrder, {state_order: 'En cours de livraison'}, function(err, order) {
        if(err) res.send(err);
        else res.send("La commande est en cours de livraison");
    });
});

router.patch('/completeOrder/:id', function(req, res) {
    const idOrder = req.params.id;

    orderModel,findByIdAndUpdate(idOrder, {state_order: 'Commande livrée'}, function(err, order) {
        if(err) res.send(err);
        else res.send("La commande a bien été livrée");
    });
});

module.exports = router;