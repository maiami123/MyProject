<template>
  <div class="header">
    <div class="homeIcon">
      <el-icon
        size="30px"
        @click="handleCollapse"
        :style="{ transform: isCollapse ? '' : 'rotate(180deg)', cursor: 'pointer' }"
      >
        <Expand />
      </el-icon>
      <span>MENU</span>
    </div>
    <div
      class="user"
      v-if="baseData.loginType !== 'custom'"
      @click="isShowUserInfo(!baseData.show)"
    >
      <img class="imgfont" :src="baseData.userInfo.headImg" />
      <div class="userInfo" v-show="baseData.show">
        <div>{{ baseData.userInfo.name }}</div>
        <div @click="loginOut">退出登入</div>
      </div>
    </div>
    <div 
    v-else 
    class="user"
    @click="isShowUserInfo(!baseData.show)">
      <div class="imgfont">遊客模式</div>
        <div class="userInfo" v-show="baseData.show">
          <div @click="router.push('/register')">註冊帳號</div>
          <div @click="router.push('/login')">馬上登入</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { onMounted, reactive, ref } from 'vue';
import { getUserInfo } from '../api/index';
/**
 * props
 */
const { handleCollapse, isCollapse } = defineProps(['handleCollapse', 'isCollapse']);

/**
 * Interface
 */
interface BaseData {
  show:boolean,
  loginType:string | null,
  userInfo:{
    name: string;
    headImg: string;
  },
}
const baseData = reactive<BaseData>({
  show:false,
  loginType: localStorage.getItem('token'),
  userInfo:{
    name: '',
    headImg: '',
  },
})

/**
 * 初始化
 */
onMounted(() => {
  if (baseData.loginType !== 'custom') { 
    getUserInfoData();
  }
});

/**
 * 函數區塊
 */
const isShowUserInfo = (val:boolean)=> {
  baseData.show = val 
};

const getUserInfoData = async () => {
  const { data: res } = await getUserInfo();
  console.log(res);
  if (res?.data.headImg && res?.data.name) {
    console.log('ok');
    baseData.userInfo.name = res?.data.name;
    baseData.userInfo.headImg = res?.data.headImg;
  }
};

const loginOut = () => {
  router.push('/login');
  localStorage.removeItem('token');
};
</script>

<style lang="less" scoped>
.userInfo {
  z-index: 22;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  bottom: -78px;
  background-color: #fff;
  border: 5px;
  box-shadow: 0 4px 8px 0 rgb(7 17 27 / 10%);
  text-align: center;
  cursor: pointer;

  div:hover {
    color: #409eff;
  }

  div {
    padding: 10px;
  }
}

.header {
  position: relative;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;

  .homeIcon {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }
  }

  .user {
    display: flex;
    justify-content: center;
    width: 90px;

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
.imgfont{
  cursor: pointer;
}
</style>
