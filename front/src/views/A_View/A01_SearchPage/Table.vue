<template>
  <div class="table">
    <el-table :data="list" :row-class-name="tableRowClassName">
      <el-table-column prop="courseImg" label="圖片">
        <template #default="scope">
          <img
            :src="scope.row.courseImg"
            class="courseImg-img"
            @click="viedoMadelShow(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="標題"></el-table-column>
      <el-table-column prop="price" label="種類"></el-table-column>
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

    <el-dialog
      v-model="dialogTableVisible"
      :title="videoTitle"
      width="80%"
      :destroy-on-close="true"
    >
      <div class="embed-container">
        <iframe
          width="100%"
          height="500"
          :src="'https://www.youtube-nocookie.com/embed/' + videoLink + '?rel=0&autoplay=1&loop=1'"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, toRaw } from 'vue';
const { list, editClick, deleteHandle } = defineProps(['list', 'editClick', 'deleteHandle']);

/**
 * Data
 */

const dialogTableVisible = ref<boolean>(false);
const videoTitle = ref<string>('');
const videoLink = ref<string>('');
/**
 * function
 */

//定義每行課程的區分顏色
const tableRowClassName = ({ rowIndex }: any) => {
  if (rowIndex % 2 === 0) {
    return 'warning-row';
  } else {
    return '';
  }
};

//開啟影片
function viedoMadelShow(val: any): void {
  dialogTableVisible.value = true;
  console.log('tt', val);
  videoTitle.value = val.title;
  videoLink.value = val.link;
}
</script>
<style lang="less" scoped>
.courseImg-img {
  width: 1.5rem;
  height: 1.2rem;
  cursor: pointer;
}

.el-table__header-wrapper {
  position: absolute !important;
}
:deep(.el-dialog__body) {
  background-color: #000000fc;
}
:deep(.el-table__header) {
  width: unset !important;
}
:deep(.el-table) {
  position: sticky;
}
</style>
