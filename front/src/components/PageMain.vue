<template>
  <div class="home">
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <slot class="slot" />
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Header from './Header.vue';
import router from '../router';
import { ref } from 'vue';
</script>

<style lang="less" scoped>
.el-aside {
  width: auto;
  background-color: #545c64;
  width: auto;
  overflow: hidden;
  z-index: 99;
}

.el-container {
  height: 100vh;
}

.el-main {
  display: flex;
}

.el-header {
  // padding: 0 20px 0 0;
  background-color: #fff;
  z-index: 1;
  width: 10rem;
  border: 1px solid #dbdbdb;
}
</style>
