<template>
  <div class="main">
    <div>
      <el-button @click="clearFilter">清除條件</el-button>
    </div>

    <div class="display">
      <el-scrollbar height="500px">
        <el-table ref="tableRef" row-key="date" :data="baseData" style="width: 100%" size="large">
          <el-table-column label="加入收藏" width="200px">
            <template #default="scope">
              <el-button
                size="small"
                v-if="baseData[scope.$index].status == 1"
                @click="handleStatus(scope.$index, scope.row, 0)"
              >
                取消
              </el-button>
              <el-button
                size="small"
                type="danger"
                v-else
                @click="handleStatus(scope.$index, scope.row, 1)"
              >
                新增
              </el-button>
            </template>
          </el-table-column>

          <el-table-column prop="song" label="歌名" width="200px">
            <template #default="scope">
              <div class="name">{{ baseData[scope.$index].song }}</div>
            </template>
          </el-table-column>

          <el-table-column prop="singer" label="歌手" />

          <el-table-column
            prop="create_date"
            label="上傳日期"
            sortable
            width="180"
            column-key="date"
          />

          <el-table-column
            prop="tag"
            label="風格"
            width="100"
            :filters="[
              { text: '抒情', value: '１' },
              { text: '輕快', value: '2' },
            ]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template #default="scope">
              <el-popover effect="light" trigger="hover" placement="top" width="auto">
                <template #default>
                  <div class="tags">
                    <el-tag :type="scope.row.tag === '抒情' ? '' : 'success'" disable-transitions>
                      {{ scope.row.tag }}
                    </el-tag>
                  </div>
                </template>
                <template #reference>
                  <el-tag :type="scope.row.tag === '抒情' ? '' : 'success'" disable-transitions>
                    {{ scope.row.tag }}
                  </el-tag>
                </template>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { ElTable } from 'element-plus';
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import { BaseData } from '../../../interface/A/MusicTab.Interface';
import { computed } from '@vue/reactivity';
import { getMusicTabInfoData, getItemInfoData } from '../../../api/index';
/**
 * computed
 */
let tag = computed(() => {
  console.log('com', baseData);
  return baseData;
});

/**
 * init
 */
onMounted(() => {
  init();
});

/**
 * Data
 */
const tableRef = ref<InstanceType<typeof ElTable>>();
const baseData = reactive<Array<BaseData>>([]);
/**
 * function
 */
async function init(): Promise<void> {
  let sqlNo = { sql_no: localStorage.getItem('sql_no') };
  const { data: res } = await getMusicTabInfoData(sqlNo ? sqlNo : '');
  console.log('music', res);
  if (res.code == 0) {
    for (let i in res.data.total) {
      baseData.push(res.data.total[i]);
    }
    console.log('in', baseData);
  }

  const { data: res1 } = await getItemInfoData({ group: 'style' });
  if (res.code == 0) {
    let tag = baseData;
    console.log('tag', tag);
  }
}

const clearFilter = (): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  tableRef.value!.clearFilter();
};
const filterTag = (value: string, row: BaseData): boolean => {
  return row.tag === value;
};
const handleStatus = (index: number, row: BaseData, status: number): void => {
  baseData[index].status = status;
  console.log(index, row);
};
</script>

<script lang="ts" setup></script>

<style lang="less" scoped>
.tags {
  display: flex;
  justify-content: center;
  align-items: center;
}

.name:hover {
  color: rgb(81, 130, 253);
  cursor: pointer;
}

.main {
  height: 100%;
  margin: 20px;
}
.display {
  border: 1px solid #ede9e9;
  border-radius: 20px;
  position: sticky;
}
:deep(.el-table--large) {
  border-radius: 20px;
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
