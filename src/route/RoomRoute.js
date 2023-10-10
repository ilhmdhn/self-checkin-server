const express = require('express');
const router = express.Router();
const { getRoomList, roomPriceData } = require('../controller/RoomController');

router.route('/room-list').get(getRoomList)
router.route('/room-price').get(roomPriceData)

module.exports = router;