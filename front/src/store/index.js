import moment from 'moment';
import { createStore } from 'vuex';

export default createStore({
  state: {
    classMode:moment(new Date()).format('HH')>=18?'dark': 'light',
  },
  actions: {},
});
