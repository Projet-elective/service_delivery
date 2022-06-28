const express = require('express');
const router = express.Router();
const commercialController = require('../controller/commercialController');

router.get('/', commercialController.getAll);

module.exports = router;