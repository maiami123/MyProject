<template>
  <div class="pagination">
    <div class="pre" @click="currentChange('pre')">上一頁</div>
    <div class="next" @click="currentChange('next')">下一頁</div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
const { currentChange } = defineProps(['currentChange']);
</script>
<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  color: #fff;

  .pre {
    background-color: #409eff;
    margin-right: 10px;
    padding: 5px;
    cursor: pointer;
  }

  .next {
    padding: 5px;
    background-color: #409eff;
    cursor: pointer;
  }
}
</style>
