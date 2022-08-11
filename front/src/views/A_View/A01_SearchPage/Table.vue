<template>
  <div class="table">
    <el-table :data="list" :row-class-name="tableRowClassName">
      <el-table-column prop="courseImg" label="圖片">
        <template #default="scope">
          <img :src="scope.row.courseImg" class="courseImg-img" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="標題"></el-table-column>
      <el-table-column prop="price" label="價格"></el-table-column>
      <el-table-column prop="point" label="評分"></el-table-column>
      <el-table-column label="操作">
        <template class="btn-group" #default="scope">
          <el-button type="primary" @click="editClick(scope.row)">編輯</el-button>
          <el-popconfirm title="確定要刪除該課程嗎?" @confirm="deleteHandle(scope.row.id)">
            <template #reference>
              <el-button type="danger">刪除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
const { list, editClick, deleteHandle } = defineProps(['list', 'editClick', 'deleteHandle']);
/**
 * 定義每行課程的區分顏色
 */
const tableRowClassName = ({ rowIndex }) => {
  if (rowIndex % 2 === 0) {
    return 'warning-row';
  } else {
    return '';
  }
};
</script>
<style lang="less" scoped>
.courseImg-img {
  width: 150px;
  height: 100px;
}

.el-table__header-wrapper {
  position: absolute !important;
}
</style>
