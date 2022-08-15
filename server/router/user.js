const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const expressJoi = require('@escook/express-joi');
const Check = require('../utils/valiFunction');
/**
 * 註冊接口
 */
router.post('/register', expressJoi(Check.userCheck), userController.registerController);
/**
 * 登入接口
 */
router.post('/login', expressJoi(Check.userCheck), userController.loginController);
/**
 * 用戶訊息
 */
router.get('/userInfo', userController.userInfoController);
/**
 * item訊息
 */
router.post('/itemInfo', userController.itemInfoController);

module.exports = router;
