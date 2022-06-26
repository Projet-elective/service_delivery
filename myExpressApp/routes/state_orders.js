const express = require('express');
const router = express.Router();
const state_orderController = require('../controller/state_orderController');


router.get('/:id', state_orderController.get);

router.patch('/validateOrder/:id', state_orderController.validate);

router.patch('/isReadyOrder/:id', state_orderController.isReady);

router.patch('/deliverOrder/:id', state_orderController.deliver);

router.patch('/completeOrder/:id', state_orderController.complete);

module.exports = router;