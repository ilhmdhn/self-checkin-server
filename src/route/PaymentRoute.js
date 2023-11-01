const express = require('express');
const { generatePayment, listPaymentMethod, postCheckin } = require('../controller/PaymentController');
const router = express.Router();

router.route('/generate-payment').post(generatePayment);
router.route('/payment-list').get(listPaymentMethod);
router.route('/checkin').post(postCheckin);

module.exports = router;