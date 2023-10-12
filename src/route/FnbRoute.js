const express = require('express');
const { getFnbCategory } = require('../controller/FnbController');
const router = express.Router();

router.route('/fnb-category').get(getFnbCategory);

module.exports = router;