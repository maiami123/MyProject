<template>
  <el-menu
    class="el-menu-vertical-demo"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    :router="true"
    :collapse="isCollapse"
  >
    <div class="xd-icon">
      <img class="logo" src="../assets/trytry.png" @click="router.push('/')" />
    </div>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Document /></el-icon>
        <span>音樂世界</span>
      </template>
      <el-menu-item index="searchSomething">推薦影片</el-menu-item>
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

    <el-sub-menu index="99">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>用戶管理</span>
      </template>
      <el-menu-item index="auth">用戶權限</el-menu-item>
      <el-menu-item index="account">帳號設置</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import router from '@/router';
const { isCollapse } = defineProps(['isCollapse']);
</script>

<style lang="less" scoped>
.el-radio-button__inner {
  padding: 0;
}

.el-menu--collapse {
  border: none;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  border: none;
}

.xd-icon {
  display: flex;
  align-items: center;
  font-weight: 600;
  height: 60px;
  background-color: #fff;
  white-space: nowrap;
  padding-left: 15px;

  img {
    width: 170px;
    height: 150px;
    margin-right: 10px;
  }
}
.logo {
  cursor: pointer;
}
</style>
