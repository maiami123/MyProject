const express = require('express');
const router = express.Router();
const musciTabController = require('../../../controllers/A/A02/musciTabController');
/**
 * 樂曲庫接口
 */
router.post('/musicTabInfo', musciTabController.musicTabInfo);

/**
 * 樂曲庫接口
 */
router.post('/searchMusicTabInfo', musciTabController.searchMusicTabInfo);

/**
 * 新增.删除功能
 */
router.post('/updateMyMusic', musciTabController.updateMyMusic);

module.exports = router;
