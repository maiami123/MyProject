import router from '@/router/index';
import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
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
  } else if(message == '身份認證失敗'){
    ElMessage({
      message: '目前為遊客模式',
      type: 'warning',
    });
    localStorage.setItem('token','custom')
    
    // router.push('/login');
  }else{
    ElMessage({
      message: message,
      type: 'error',
    });
  }
  return res;
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
