const express = require('express');
const router = express.Router();
const { getRoomList, roomPriceData, getDetailRoom } = require('../controller/RoomController');

router.route('/room-list').get(getRoomList)
router.route('/room-price').get(roomPriceData)
router.route('/room-detail').get(getDetailRoom)

module.exports = router;