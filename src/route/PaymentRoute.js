const express = require('express');
const { generatePayment, listPaymentMethod, cekPayment } = require('../controller/PaymentController');
const router = express.Router();

router.route('/generate-payment').post(generatePayment);
router.route('/payment-list').get(listPaymentMethod);
router.route('/cek-payment').post(cekPayment);

module.exports = router;