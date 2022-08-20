<template>
  <div class="header">
    <div class="xd-icon">
      <img class="logo" src="../assets/trytry.png" @click="router.push('/')" />
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      :router="true"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Menu /></el-icon>
          MENU
        </template>

        <el-sub-menu index="1-1">
          <template #title>
            <el-icon><Document /></el-icon>
            資料管理
          </template>
          <el-menu-item index="searchSomething">查詢功能展示</el-menu-item>
          <el-menu-item index="musicTab">樂譜庫</el-menu-item>
          <el-menu-item index="myMusic">我的樂譜</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><PieChart /></el-icon>
            <span>三維世界</span>
          </template>
          <el-menu-item index="base3D">立方體</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>

      <el-sub-menu index="99">
        <template #title>
          <el-icon><setting /></el-icon>
          <span>用戶管理</span>
        </template>
        <el-menu-item index="auth">用戶權限</el-menu-item>
        <el-menu-item index="account">帳號設置</el-menu-item>
      </el-sub-menu>
    </el-menu>

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
    <div v-else class="user" @click="isShowUserInfo(!baseData.show)">
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
import { error } from 'console';
import { watch } from 'fs';
import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { getUserInfo } from '../api/index';

const activeIndex = ref('1');
const activeIndex2 = ref('1');
const store = useStore();
/**
 * props
 */
const { handleCollapse, isCollapse } = defineProps(['handleCollapse', 'isCollapse']);

/**
 * Interface
 */
interface BaseData {
  show: boolean;
  loginType: string | null;
  userInfo: {
    name: string;
    headImg: string;
  };
}
const baseData = reactive<BaseData>({
  show: false,
  loginType: store.state.loginType,
  userInfo: {
    name: '',
    headImg: '',
  },
});

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

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const isShowUserInfo = (val: boolean) => {
  baseData.show = val;
};

const getUserInfoData = async (): Promise<void> => {
  const res: any = await getUserInfo();
  if (res?.data.headImg && res?.data.name) {
    console.log('ok');
    baseData.userInfo.name = res?.data.name;
    baseData.userInfo.headImg = res?.data.headImg;
  } else {
    console.log('fail');
    baseData.loginType = 'custom';
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
  bottom: -100px;
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
    font-size: large;

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
.imgfont {
  cursor: pointer;
}

.xd-icon img {
  width: 1.5rem;
  height: 1.5rem;
}
.logo {
  cursor: pointer;
}
</style>
