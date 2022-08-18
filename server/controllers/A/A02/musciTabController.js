const db = require('../../../config/db');
const moment = require('moment');
/**
 * 樂譜查詢
 */
exports.musicTabInfo = (req, res) => {
  console.log('******     musicTabInfo   start    ******');
  // page = (page - 1) * size;
  const pageSql = `
    select * from video where del=0 and category =? order by id limit ?,?
    `;
  const totalSql = `
    select 
    amt.sql_no as sql_no ,
    ifnull(mm.user_id = ${req.body.sql_no},0)  as status,
    song,
    singer,
    tag,
    DATE_FORMAT(amt.create_date, "%Y-%m-%d") as create_date
    from 
    all_music_tab amt
    left join my_music mm on mm.all_music_tab_id = amt.sql_no 
    where amt.status = 1 
    `;

  db.query(totalSql, (err, result) => {
    if (err) {
      console.log('musicTabInfoERR', err);
      return res.send({ code: 1, message: err.message });
    }

    console.log('******     musicTabInfo sucess end    ******');
    res.send({
      code: 0,
      data: {
        total: result,
      },
    });
  });
};

/**
 * 检索
 */
exports.searchMusicTabInfo = (req, res) => {
  console.log('******     searchMusicTabInfo   start    ******');
  // page = (page - 1) * size;
  const pageSql = `
  select * from video where del=0 and category =? order by id limit ?,?
  `;

  let keyWord = '';
  if (req.body.keyWord) {
    keyWord = `AND (amt.song LIKE '%${req.body.keyWord}%' OR amt.singer LIKE '%${req.body.keyWord}%')`;
  }

  const totalSql = `
  select 
  amt.sql_no as sql_no ,
  ifnull(mm.user_id = ${req.body.sql_no},0)  as status,
  song,
  singer,
  tag,
  DATE_FORMAT(amt.create_date, "%Y-%m-%d") as create_date
  from 
  all_music_tab amt
  left join my_music mm on mm.all_music_tab_id = amt.sql_no 
  where amt.status = 1 ${keyWord}
  `;

  db.query(totalSql, (err, result) => {
    if (err) {
      console.log('searchMusicTabInfoERR', err);
      return res.send({ code: 1, message: err.message });
    }

    console.log('******     searchMusicTabInfo sucess end    ******');
    res.send({
      code: 0,
      data: {
        total: result,
      },
    });
  });
};

/**
 * 乐谱新增.删除
 */
exports.updateMyMusic = (req, res) => {
  console.log('******     updateMyMusic   start    ******');
  // page = (page - 1) * size;
  const pageSql = `
    select * from video where del=0 and category =? order by id limit ?,?
    `;

  const searchSql = `
    select count(*)as count from my_music where user_id = ${req.body.userSqlNo} and all_music_tab_id =${req.body.allMusicSqlNo}
    `;
  const delSql = `
    delete from my_music where user_id = ${req.body.userSqlNo} and all_music_tab_id =${req.body.allMusicSqlNo} 
    `;
  const insertSql = `
INSERT INTO my_music (user_id, all_music_tab_id, create_date, create_user) VALUES ( ${
    req.body.userSqlNo
  } , ${req.body.allMusicSqlNo} , '${moment(new Date()).utcOffset(9).format('YYYY-MM-DD')}', ${
    req.body.userSqlNo
  });
  `;

  db.getConnection((err, conn) => {
    conn.beginTransaction(err => {
      if (err) {
        conn.release();
        throw err;
      }
      //检索是否重复
      conn.query(searchSql, (err, result) => {
        if (err) {
          console.log('searchMyMusicERR', err);
          conn.release();
          return res.send({ code: 1, message: err.message });
        }
        let count = result[0].count;

        //不存在则新增
        if (count == 0) {
          conn.query(insertSql, (err, result) => {
            if (err) {
              console.log('insertMyMusicERR', err);
              conn.release();
              return res.send({ code: 1, message: err.message });
            }
            conn.commit(err => {
              if (err) {
                conn.rollback(() => {
                  conn.release();
                  return res.send({ code: 1, message: err.message });
                });
              }
              console.log('******     insertMyMusic sucess end    ******');
              res.send({
                code: 0,
                data: {
                  results: result,
                },
              });
            });
          });
          //存在则删除
        } else {
          conn.query(delSql, (err, result) => {
            if (err) {
              console.log('delMyMusicERR', err);
              conn.release();
              return res.send({ code: 1, message: err.message });
            }

            conn.commit(err => {
              if (err) {
                conn.rollback(() => {
                  conn.release();
                  return res.send({ code: 1, message: err.message });
                });
              }
              console.log('******     delMyMusic sucess end    ******');
              res.send({
                code: 0,
                data: {
                  results: result,
                },
              });
            });
          });
        }
      });
    });
  });
};
