const express = require('express');
const { checkinPayLater } = require('../controller/InsertCheckinController');
const router = express.Router();

router.route('/checkin-paylater').post(checkinPayLater);

module.exports = router;