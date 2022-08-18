<template>
  <div
    class="main"
    v-loading="loading"
    element-loading-text="玩命加載中...o(*≧▽≦)ツ┏━┓"
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    style="width: 100%"
  >
    <div class="searchArea">
      <div class="showSearch">
        <el-form>
          <el-form-item>
            <el-input v-model.trim="base.inputValue" placeholder="請輸入內容"></el-input>
            <el-button type="primary" @click="handleClick">查詢</el-button>
          </el-form-item>
          <el-button class="btn-2" @click="clearFilter">清除條件</el-button>
        </el-form>
      </div>
    </div>

    <div class="display">
      <el-scrollbar height="100%">
        <el-table ref="tableRef" row-key="date" :data="finalData" style="width: 100%" size="large">
          <el-table-column label="加入收藏" width="200px">
            <template #default="scope">
              <el-button
                size="small"
                v-if="tableData[scope.$index].status == 1"
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
              <div class="name">{{ tableData[scope.$index].song }}</div>
            </template>
          </el-table-column>

          <el-table-column prop="singer" label="歌手">
            <template #default="scope">
              <div>{{ tableData[scope.$index].singer }}</div>
            </template>
          </el-table-column>

          <el-table-column
            prop="create_date"
            label="上傳日期"
            sortable
            width="180"
            column-key="date"
          >
            <template #default="scope">
              <div>{{ tableData[scope.$index].create_date }}</div>
            </template>
          </el-table-column>

          <el-table-column
            prop="finaltag"
            label="風格"
            width="100"
            :filters="finaltag"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template #default="scope">
              <el-popover effect="light" trigger="hover" placement="top" width="auto">
                <template #default>
                  <div class="tags">
                    <el-tag :type="handColor(scope.row.tag)" disable-transitions>
                      {{ scope.row.tag }}
                    </el-tag>
                  </div>
                </template>
                <template #reference>
                  <el-tag :type="handColor(scope.row.tag)" disable-transitions>
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
import {
  TableData,
  TableDataInit,
  baseDataInit,
  tagInit,
} from '../../../interface/A/MusicTab.Interface';
import { computed } from '@vue/reactivity';
import {
  getMusicTabInfoData,
  getItemInfoData,
  searchMusicTabInfoData,
  updateMyMusic,
} from '../../../api/index';
/**
 * computed
 */
//組裝TAG資料
const finaltag = computed(() => {
  let result = [];
  for (let i in tagPullDown) {
    result.push({ text: tagPullDown[i].value, value: tagPullDown[i].num });
  }
  return result;
});

//組裝顯示資料
const finalData = computed(() => {
  let result = [];
  let name = {};
  for (let i in tableData) {
    name = tagPullDown.filter(item => item.num == tableData[i].tag).map(item => item.value)[0];
    result.push({ ...tableData, tag: name });
  }
  return result;
});

/**
 * init
 */
onMounted(() => {
  init('init');
});

/**
 * Data
 */
const tableRef = ref<InstanceType<typeof ElTable>>();
const tableData = reactive([{ ...TableDataInit }]);
const tagPullDown = reactive([{ ...tagInit }]);
const base = reactive({
  ...baseDataInit,
  userSqlNo: Number(localStorage.getItem('sql_no')),
});
const loading = ref<boolean>(false);
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
/**
 * function
 */
async function init(model: string): Promise<void> {
  loading.value = true;

  /**
   * init
   */
  if (model == 'init') {
    //取得使用者ID
    let sqlNo = { sql_no: localStorage.getItem('sql_no') };

    //初始化輸入筐及資料
    base.inputValue = '';
    tableData.length = 0;

    //發送請求
    const { data: res } = await getMusicTabInfoData(sqlNo ? sqlNo : '');

    //請求成功
    if (res.code == 0) {
      for (let i in res.data.total) {
        tableData.push(res.data.total[i]);
      }
    }
  }
  /**
   * search
   */
  if (model == 'search') {
    //取得使用者ID
    let data = { sql_no: localStorage.getItem('sql_no'), keyWord: base.inputValue };
    //發送請求
    const { data: res } = await searchMusicTabInfoData(data ? data : '');

    //請求成功
    if (res.code == 0) {
      //成功後清除原有資料
      tableData.length = 0;
      for (let i in res.data.total) {
        tableData.push(res.data.total[i]);
      }
    }
  }

  //取得覆選資料
  const { data: res1 } = await getItemInfoData({ group: 'style' });
  //請求成功
  if (res1.code == 0) {
    tagPullDown.length = 0;
    for (let i in res1.data.result) {
      tagPullDown.push(res1.data.result[i]);
    }
  }

  setTimeout(() => {
    loading.value = false;
  }, 500);
}

//清除資料按鈕
const clearFilter = (): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  tableRef.value!.clearFilter();
  //初始化
  init('init');
};

//標簽篩選
const filterTag = (value: string, row: TableData): boolean => {
  let result = tagPullDown.filter(item => item.num == value)[0].value;
  return row.tag === result;
};
//新增.刪除 我的樂譜 按鈕
const handleStatus = async (index: number, row: TableData, status: number): Promise<void> => {
  tableData[index].status = status;

  //組裝資料
  const param = new URLSearchParams({
    allMusicSqlNo: tableData[index].sql_no.toString(),
    userSqlNo: base.userSqlNo ? base.userSqlNo.toString() : '',
  });
  //取得覆選資料
  const { data: res } = await updateMyMusic(param);
  //請求成功
  if (res.code == 0) {
  }
};

//TAG顏色
function handColor(value: string): string {
  let color: string = '';
  if (value === '抒情') {
    color = 'success';
  } else if (value === '悲傷') {
    color = 'warning';
  } else if (value === '勵志') {
    color = 'error';
  }
  return color;
}
//檢索按鈕
function handleClick(): void {
  init('search');
}
</script>

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
}
.display {
  border: 1px solid #ede9e9;
  border-radius: 20px;
  position: sticky;
  box-shadow: 10px 10px 10px #bbb;
  height: 70%;
  margin: 30px;
}
:deep(.el-table--large) {
  border-radius: 20px;
  height: 100%;
}
:deep(.el-scrollbar__view) {
  height: 100%;
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

.searchArea {
  width: 100%;
  height: 20%;
  display: flex;
}

.showSearch {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  box-shadow: 5px 5px 5px #bbb;
  margin: 20px;
}

.showSearch:hover {
  background: #fbfbfb;
  border-radius: 20px;

  width: 100%;
  height: 100%;
}
:deep(.el-form-item__content) {
  flex-wrap: nowrap !important;
}
:deep(.el-form) {
  width: 50%;
}
</style>
