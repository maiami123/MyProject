import request from '../utils/request';

/**
 * 注冊接口
 */
export const getRegister = (data: any) => {
  return request({ method: 'post', url: '/api/v1/user/register', data });
};

/**
 * 登錄接口
 */
export const getLogin = (data: any) => {
  return request({ method: 'post', url: '/api/v1/user/login', data });
};

/**
 * 獲取用戶信息接口開發
 */
export const getUserInfo = () => {
  return request({ method: 'get', url: '/api/v1/user/userInfo' });
};

/**
 * 獲取item
 */
 export const getItemInfoData = (data:any) => {
  return request({ method: 'post', url: '/api/v1/user/itemInfo',data});
};

/**
 * A_View
 */

//A02
export const getMusicTabInfoData = (data?:any) => {
  return request({ method: 'post', url: '/api/v1/musicTab/musicTabInfo',data});
};

//檢索
export const searchMusicTabInfoData = (data?:any) => {
  return request({ method: 'post', url: '/api/v1/musicTab/searchMusicTabInfo',data});
};

//新增刪除
export const updateMyMusic = (data?:any) => {
  return request({ method: 'post', url: '/api/v1/musicTab/updateMyMusic',data});
};