const express = require('express');
const router = express.Router();
const { getRoomCategory } = require('../controller/RoomController');

router.route('/room-category').get(getRoomCategory)

module.exports = router;