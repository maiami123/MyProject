const { result } = require('@hapi/joi/lib/base');
const db = require('../config/db');

/**
 * 課程查詢
 */
exports.listVideo = (req, res) => {
  let { category, page, size } = req.query;
  page = (page - 1) * size;
  const pageSql = `
  select * from video where del=0 and category =? order by id limit ?,?
  `;

  const totalSql = `
  select count(*) as total from video where del=0 and category = ?
  `;

  db.query(pageSql, [category, Number(page), size], (err, resPage) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }
    db.query(totalSql, category, (err, resTotal) => {
      if (err) {
        return res.send({ code: 1, message: err.message });
      }
      res.send({
        code: 0,
        data: {
          list: resPage,
          total: resTotal,
        },
      });
    });
  });
};

/**
 * 课程修改
 */

exports.updateVideoById = (req, res) => {
  let { title, price, id } = req.query;
  let sql = `update video set `;
  let arr = [];
  if (title && price) {
    sql = sql + `title = ? , price = ? where id = ? `;
    arr = [title, Number(price), Number(id)];
  } else if (title) {
    sql = sql + `title = ?  where id = ? `;
    arr = [title, Number(id)];
  } else if (price) {
    sql = sql + `price = ? where id = ? `;
    arr = [Number(price), Number(id)];
  }
  db.query(sql, arr, (err, result) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }
    res.send({ code: 0, message: '修改成功' });
  });
};

/**
 * 删除
 */

exports.deleteVideoById = (req, res) => {
  let { id } = req.query;
  let sql = `update video set del = 1 where id = ? `;

  db.query(sql, id, (err, result) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }
    res.send({ code: 0, message: '删除成功' });
  });
};
