const express = require('express');
const router = express.Router();
const musciTabController = require('../../../controllers/A/A02/musciTabController');
/**
 * 樂曲庫接口
 */
router.post('/musicTabInfo', musciTabController.musicTabInfo);


module.exports = router;
