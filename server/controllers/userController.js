const db = require('../config/db');
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config/jwtSecretKey');
/**
 * 加密
 */
const bcrypt = require('bcryptjs');
const valiFunction = require('../utils/valiFunction');

/**
 * 注册接口
 */
exports.registerController = (req, res) => {
  //判空
  let { userName, password } = req.body;

  if (valiFunction.isEmpty(userName) || valiFunction.isEmpty(password)) {
    return res.send({ code: 1, message: '用戶名或是密碼記得填寫喔!' });
  }

  const userSelectSql = `select * from user where name= ? ;`;

  console.log(userSelectSql);
  //判重
  db.query(userSelectSql, userName, (err, result) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }
    console.log(result);

    if (result.length > 0) {
      return res.send({ code: 1, message: '用戶名稱已經存在囉!' });
    }
    const passwordB = bcrypt.hashSync(password, 10);
    //隨機頭像
    const imgList = [
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/10.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/11.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/12.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/13.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/15.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/16.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/17.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/18.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/19.jpeg',
    ];
    const num = Math.floor(Math.random() * 10 + 1);

    const userInsertSql = 'insert into user (name,pwd,head_img) value (?,?,?)';
    db.query(userInsertSql, [userName, passwordB, imgList[num]], (err, result) => {
      if (err) {
        return res.send({ code: 1, message: err.message });
      }
      res.send({ code: 0, message: '註冊成功' });
    });
  });
};
/**
 * 登入接口
 */
exports.loginController = (req, res) => {
  let { userName, password } = req.body;

  const userSelectSql = `select * from user where name = ?`;
  db.query(userSelectSql, userName, (err, result) => {
    if (err) {
      console.log(err);
      return res.send({ code: 1, message: err.message });
    }
    console.log(result);
    if (result.length == 0) {
      return res.send({ code: 1, message: '帳號不存在喔!請先註冊!' });
    }

    const compareState = bcrypt.compareSync(password, result[0].pwd);

    if (!compareState) {
      return res.send({ code: 1, message: '密碼錯啦!' });
    }
    const user = { ...result[0], pwd: '' };
    const token = jwt.sign(user, jwtSecretKey, { expiresIn: '24h' });
    const sql_no = user.sql_no;
    res.send({ code: 0, message: '登入成功', token: 'Bearer ' + token, sql_no: sql_no });
  });
};
/**
 * 用户讯息查询逻辑
 */
exports.userInfoController = (req, res) => {
  const token = req.headers.authorization;
  const userInfo = jwt.verify(token.split('Bearer ')[1], jwtSecretKey);
  console.log(userInfo);
  res.send({ code: 0, data: { name: userInfo.name, headImg: userInfo.head_img } });
};

/**
 * item查询逻辑
 */
exports.itemInfoController = (req, res) => {
  console.log('*****  itemInfo  start   *****');
  const group = req.body.group;

  const sql = `
  select *
  from item
  where item.group = '${group}'
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.log('itemInfoERR', err);
      return res.send({ code: 1, message: err.message });
    }

    console.log('*****  itemInfo  end   *****');
    res.send({ code: 0, data: { result: result } });
  });
};
