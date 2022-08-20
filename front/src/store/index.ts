import moment from 'moment';
import { createStore } from 'vuex';

export default createStore({
  state: {
    classMode:Number(moment(new Date()).format('HH')) >=18?'dark': 'light',
    loginType:localStorage.getItem('token')
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
