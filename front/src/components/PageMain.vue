<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <Aside :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <Header :handleCollapse="handleCollapse" :isCollapse="isCollapse" />
        </el-header>
        <slot class="slot" />
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Header from './Header.vue';
import Aside from './Aside.vue';
import router from '../router';
import { ref } from 'vue';

const isCollapse = ref(true);
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style lang="less" scoped>
.el-aside {
  width: auto;
  background-color: #545c64;
  width: auto;
  overflow: hidden;
  z-index: 1;
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
}
</style>
