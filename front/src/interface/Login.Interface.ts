import { reactive } from "vue";

export interface BaseDate {
    userInfo: {
        [key: string]: string,
        userName: string,
        password: string
    },
    errorMessage: {
        [key: string]: string,
        userName: string,
        password: string,
    }
}

export const baseData = reactive<BaseDate>({
    userInfo: {
        userName: '',
        password: ''
    },
    errorMessage: {
        userName: '',
        password: ''
    }
})