const express = require('express');
const router = express.Router();
const { getFnbCategory, getFnbPaging } = require('../controller/FnbController');

router.route('/fnb-category').get(getFnbCategory);
router.route('/fnb-list').get(getFnbPaging);

module.exports = router;