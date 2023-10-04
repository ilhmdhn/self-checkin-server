const express = require('express');
const router = express.Router();
const { getRoomCategory, getListRoom } = require('../controller/RoomController');

router.route('/room-category').get(getRoomCategory)
router.route('/room-list').get(getListRoom)

module.exports = router;