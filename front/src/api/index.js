import request from '../utils/request';

/**
 * 注冊接口
 */
export const getRegister = data => {
  return request({ method: 'post', url: '/api/v1/user/register', data });
};

/**
 * 登錄接口
 */
export const getLogin = data => {
  return request({ method: 'post', url: '/api/v1/user/login', data });
};

/**
 * 獲取用戶信息接口開發
 */
export const getUserInfo = () => {
  return request({ method: 'get', url: '/api/v1/user/userInfo' });
};
