const express = require('express');

const app = express();
//解析post請求的body數據

const bodyParser = require('body-parser');

//解決跨域問題
const cors = require('cors');

//解析token
const expressJwt = require('express-jwt');
const { jwtSecretKey } = require('./config/jwtSecretKey');

// 接口
const userRouter = require('./router/user');
const courseRouter = require('./router/course');
const musicTabRouter = require('./router/A/A02/musicTab')

//錯誤中間件
const joi = require('joi');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));
app.use(
  expressJwt({ secret: jwtSecretKey, algorithms: ['HS256'] }).unless({
    path: ['/api/v1/user/login', '/api/v1/user/register'],
  })
);
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) {
    return res.send({ code: 1, message: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    return res.send({
      code: 1,
      message: '身份認證失敗',
    });
  }
  res.send({ code: 1, message: err.message });
});
//配置接口
app.use('/api/v1/user', userRouter);
app.use('/api/v1/course', courseRouter);

//A02
app.use('/api/v1/musicTab', musicTabRouter);

app.listen(3000, () => {
  console.log('啟動服務在:http://127.0.0.1:3000');
});
