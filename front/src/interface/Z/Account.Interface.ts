import { reactive } from "vue";
import type { UploadProps, UploadUserFile } from 'element-plus'

export interface BaseDate {
    userInfo: {
        [key: string]: string,
        name: string,
        password: string,
        headImg: string,
    },
    fileList: UploadUserFile[]
}

export const baseData = reactive<BaseDate>({
    userInfo: {
        name: '',
        password: '',
        headImg:'',
    },
    fileList: []
})