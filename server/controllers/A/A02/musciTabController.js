
const db = require('../../../config/db');

/**
 * 樂譜查詢
 */
 exports.musicTabInfo = (req, res) => {
    console.log('******     musicTabInfo   start    ******')
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
  
      db.query(totalSql,(err, result) => {
        if (err) {
            console.log('musicTabInfoERR',err)
          return res.send({ code: 1, message: err.message });
        }
    
    // console.log('result',result)

    console.log('******     musicTabInfo sucess end    ******')
        res.send({
          code: 0,
          data: {
            total: result,
          },
        });
      });
  };
  