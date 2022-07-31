<template>
  <div class="header">
    <div class="homeIcon">
      <el-icon
        size="30px"
        @click="handleCollapse"
        :style="{ transform: isCollapse ? '' : 'rotate(180deg)' }"
      >
        <Expand />
      </el-icon>
      <span>首頁</span>
    </div>
    <div class="user" @mouseenter="isShowUserInfo('show')" @mouseleave="isShowUserInfo('leave')">
      <img :src="userInfo.headImg" />
      <div class="userInfo" v-show="show">
        <div>{{ userInfo.name }}</div>
        <div @click="loginOut">退出登入</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import { onMounted, reactive, ref } from 'vue';
import { getUserInfo } from '../api/index';
/**
 * props
 */
const { handleCollapse, isCollapse } = defineProps(['handleCollapse', 'isCollapse']);

/**
 * 數據區塊
 */
const show = ref(false);

const userInfo = reactive({ name: '', headImg: '' });

/**
 * 初始化
 */
onMounted(() => {
  getUserInfoData();
});

/**
 * 函數區塊
 */
const isShowUserInfo = type => {
  type == 'show' ? (show.value = true) : (show.value = false);
};

const getUserInfoData = async () => {
  const { data: res } = await getUserInfo();
  console.log(res);
  if (res?.data.headImg && res?.data.name) {
    console.log('ok');
    userInfo.name = res?.data.name;
    userInfo.headImg = res?.data.headImg;
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
  bottom: -72px;
  background-color: #fff;
  border: 5px;
  box-shadow: 0 4px 8px 0 rgb(7 17 27 / 10%);
  text-align: center;

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
</style>
