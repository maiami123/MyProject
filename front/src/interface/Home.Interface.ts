import moment from 'moment';
import { reactive } from 'vue';

export interface BaseDate {
    Data: {
        [key: string]: string,
        hour: string;
        minute: string;
        seconds: string;
        ampm: string;
    };
}

export const baseData = reactive<BaseDate>({
    Data: {
        hour: moment(new Date()).format('HH'),
        minute: moment(new Date()).format('mm'),
        seconds: moment(new Date()).format('ss'),
        ampm: '',
      },
})