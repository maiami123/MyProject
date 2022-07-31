const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi');
const Check = require('../utils/valiFunction');
const courseController = require('../controllers/courseController');
/**
 * 課程查詢
 */
router.get('/package-lock.jsonfind', expressJoi(Check.findCourseCheck), courseController.listVideo);

router.get('/update', expressJoi(Check.updateCourseCheck), courseController.updateVideoById);

router.get('/delete', expressJoi(Check.deleteCourseCheck), courseController.deleteVideoById);

module.exports = router;
