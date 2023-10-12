const express = require('express');
const { getTaxService } = require('../controller/PricingController');
const router = express.Router();

router.route('/service-tax').get(getTaxService)

module.exports = router;