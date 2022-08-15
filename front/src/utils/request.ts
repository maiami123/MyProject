import router from '@/router/index';
import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
/**
 * 創建axios實例
 */
const ENV = process.env.NODE_ENV;
const host = ENV === 'development' ? 'http://127.0.0.1:3000' : 'http://54.244.89.138:3000';
const service = axios.create({
  baseURL: host,
  timeout: 3000,
});

/**
 * 請求攔截
 */
service.interceptors.request.use(config => {
  //@ts-ignore
  if (config.url.indexOf('register') < 0 && config.url.indexOf('login') < 0) {
  //@ts-ignore
    config.headers.authorization = localStorage.getItem('token')
  }
  return config;
});

/**
 * 響應攔截
 */
service.interceptors.response.use(res => {
  const { code, data, message } = res.data;
  if (code == 0) {
    return res;
  } else {
    ElMessage({
      message: message,
      type: 'error',
    });
  }
  if (message == '身分認證失敗') {
    router.push('/login');
  }
});

/**
 * 封裝請求函數
 */
const request = (options: AxiosRequestConfig<any>) => {
  if (options.method === 'get') {
    options.params = options.data;
  }
  return service(options);
};

export default request;
