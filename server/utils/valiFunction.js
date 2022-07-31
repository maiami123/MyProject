const joi = require('joi');

const userName = joi
  .string()
  .regex(/^[\S]{1,6}$/)
  .required();
const password = joi
  .string()
  .regex(/^[\S]{6,12}$/)
  .required();

exports.userCheck = {
  body: {
    userName,
    password,
  },
};

const category = joi.string().required();
const page = joi.number().integer().required();
const size = joi.number().integer().required();
exports.findCourseCheck = {
  query: {
    category,
    page,
    size,
  },
};

const title = joi.string();
const price = joi.number();
const id = joi.number().integer().required();
exports.updateCourseCheck = {
  query: {
    title,
    price,
    id,
  },
};

exports.deleteCourseCheck = {
  query: {
    id,
  },
};

exports.isEmpty = function isEmpty(value) {
  let result = false;
  if (
    value == 'undefined' ||
    value == 'null' ||
    value === null ||
    value === '' ||
    value === undefined
  ) {
    result = true;
    return result;
  }

  return result;
};

/**
 * 指定文字列の長さは指定長さかどうかをチェック
 * @param {*} value 指定文字列
 * @param {*} length 長さ
 */
exports.isLength = function isLength(value, length) {
  let result = true;

  if (value.length != length) {
    return result;
  }

  result = false;
  return result;
};

/**
 * 指定文字列の長さは指定長さ以上かどうかをチェック
 *
 * @param {*} value 指定文字列
 * @param {*} length 長さ
 */
exports.isGreaterThanLength = function isGreaterThanLength(value, length) {
  let result = false;

  if (value.length > length) {
    return result;
  }

  result = true;
  return result;
};

/**
 * 指定文字列の長さは指定長さ以下かどうかをチェック
 *
 * @param {*} value 指定文字列
 * @param {*} length 長さ
 */
exports.isLessThanLength = function isLessThanLength(value, length) {
  if (value.length <= length) {
    return true;
  }

  return false;
};

/**
 * 指定文字列は半角数字かどうかをチェック
 *
 * @param {*} value 指定文字列
 */
exports.isNumberic = function isNumberic(value) {
  var regexp = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
  return regexp.test(value);
};

/**
 * 指定文字列は半角英数字かどうかをチェック
 *
 * @param {*} value 指定文字列
 */
exports.isEisuji = function isEisuji(value) {
  var regexp = new RegExp(/^[A-Za-z0-9]*$/);
  return regexp.test(value);
};

/**
 * 指定文字列は全角ひらがなかどうかをチェック
 *
 * @param {*} value 指定文字列
 */
exports.isHiragana = function isHiragana(value) {
  var regexp = new RegExp(/^[ぁ-んー]+$/);
  return regexp.test(value);
};

/**
 * 指定文字列は全角カナかどうかをチェック
 *
 * @param {*} value 指定文字列
 */
exports.isKana = function isKana(value) {
  var regexp = new RegExp(/^[ァ-ヶー　]+$/);
  return regexp.test(value);
};

/**
 * メールフォーマットチェック
 *
 * @param {*} value 指定文字列
 */
exports.isMail = function isMail(value) {
  const regexp = new RegExp(
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
  );
  return regexp.test(value);
};

/**
 * 日付の妥当性を設定
 *
 * 日付の場合、trueを返却
 * 日付でない場合、falseを返却
 */
exports.isDate = function isDate(dateStr) {
  let date = new Date(dateStr);
  return !isNaN(date.getDate());
};

/**
 * 時間の妥当性を設定
 *
 * 時間の場合、trueを返却
 * 時間でない場合、falseを返却
 */
exports.isTime = function isTime(value) {
  const regexp = new RegExp(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/);
  return regexp.test(value);
};

/**
 * 過去n日より後の日付かの設定
 *
 * 引数 例) 20220101
 * 後の日付でない場合、trueを返却
 * 後の日付の場合、falseを返却
 */
exports.isAfterDate = function isAfterDate(dateStr, n) {
  let date1 = new Date(dateStr);
  let date2 = new Date();
  date2.setDate(date2.getDate() - n);
  let date1_str =
    String(date1.getFullYear()) +
    String(date1.getMonth() + 1).padStart(2, '0') +
    String(date1.getDate());
  let date2_str =
    String(date2.getFullYear()) +
    String(date2.getMonth() + 1).padStart(2, '0') +
    String(date2.getDate());
  if (date1_str < date2_str) {
    return true;
  } else {
    return false;
  }
};

/**
 * 年月日の大小の設定
 *
 * 引数 例) 20220101
 * 比較が正しい場合、trueを返却
 * 比較が間違い場合、falseを返却
 */
exports.compareDateTime = function compareDateTime(dateStrFr, timeStrFr, dateStrTo, timeStrTo) {
  //alert("compareDateTime:  "+dateStrFr+timeStrFr+'  '+ dateStrTo+timeStrTo);
  if (dateStrFr + timeStrFr > dateStrTo + timeStrTo) {
    return false;
  } else {
    return true;
  }
};

/**
 * URLフォーマットチェック
 *
 * @param {*} value 指定文字列
 */
exports.isURL = function isURL(value) {
  const regexp = new RegExp(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g);
  return !regexp.test(value);
};

/**
 * データ大小チェック
 *
 * dateStrStart > dateStrEndの場合、falseを返却
 * 上記以外の場合、trueを返却
 */
exports.dateBe4AfterCheck = function dateBe4AfterCheck(dateStrStart, dateStrEnd) {
  let result = true;
  let dateStart = new Date(dateStrStart);
  let dateEnd = new Date(dateStrEnd);

  if (dateStart.getTime() > dateEnd.getTime()) {
    result = false;
    return result;
  }

  return result;
};

/**
 * 電話番号フォーマットチェック（ハイフンあり）
 *
 * @param {*} value 指定文字列
 */
exports.isTel = function isTel(value) {
  const regexp = new RegExp(/\d{2,4}-\d{2,4}-\d{4}/);
  return !regexp.test(value);
};

/**
 * 電話番号フォーマットチェック
 * 指定文字列は半角数字かどうかをチェック
 * 文字列の長さは9-11かどうかをチェック
 * @param {*} value 指定文字列
 */
exports.isReallyTel = function isTel(value) {
  let result = false;
  let tel = value.toString().replaceAll('-', '');
  const regexp = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
  if (regexp.test(tel)) {
    if (tel.length >= 9 && tel.length <= 11) {
      result = true;
    }
  }

  console.log(result);
  return result;
};
