const express = require('express');
const { generatePayment, listPaymentMethod } = require('../controller/PaymentController');
const router = express.Router();

router.route('/generate-payment').post(generatePayment);
router.route('/payment-list').get(listPaymentMethod)

module.exports = router;