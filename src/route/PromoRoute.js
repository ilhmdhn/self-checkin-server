const express = require('express');
const router = express.Router();
const { getPromoRoom, getPromoFood } = require('../controller/PromoController');

router.route('/promo-room').get(getPromoRoom);
router.route('/promo-food').get(getPromoFood);

module.exports = router;