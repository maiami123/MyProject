<template>
  <div class="main">
    <el-form>
      <el-form-item>
        <el-input v-model.trim="inputValue" placeholder="請輸入內容"></el-input>
      </el-form-item>
      <el-button type="primary" @click="handleClick">查詢</el-button>
    </el-form>
    <Table :list="courseList" :editClick="editClick" :deleteHandle="deleteHandle" />
    <Pagination :currentChange="currentChange"></Pagination>
  </div>
  <EditPop
    :popShow="popShow"
    v-if="popShow"
    :message="courseItemState.message"
    :confirmClick="confirmClick"
  />
</template>
<script lang="ts" setup>
import Table from './Table.vue';
import EditPop from './EditPop.vue';
import Pagination from '../../../components/Pagination.vue';
import { reactive, ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
/**
 * 初始化的數據
 */
const data = reactive({
  list: [
    {
      category: 'front',
      courseImg:
        'https://i.ytimg.com/an_webp/zQGiYbdaT5U/mqdefault_6s.webp?du=3000&sqp=CM_7-JcG&rs=AOn4CLBIU4aMB7_gO4SIa4tGUj8_Js13Hw',
      del: 0,
      id: 1,
      point: 9.8,
      price: '歌唱',
      title: '改掉咙唱歌，小白也能听懂的科学发声方法！',
      link: 'zQGiYbdaT5U',
    },
    {
      category: 'front',
      courseImg:
        'https://i.ytimg.com/an_webp/NZtfVHvDk-o/mqdefault_6s.webp?du=3000&sqp=CIKE-ZcG&rs=AOn4CLCe4Tu8AOK-FVQZ5JxTYez1isiY1Q',
      del: 0,
      id: 2,
      point: 9.5,
      price: '編曲/作曲',
      title: '「作詞、作曲、編曲」是什麼？初學者必看｜音樂製作課 【新生訓練系列】',
      link: 'NZtfVHvDk-o',
    },
    {
      category: 'front',
      courseImg:
        'https://i.ytimg.com/vi/nM_Nz4gB2T8/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAGNqPz4ZiZ0dqJdIwjGYZBbhIRgA',
      del: 0,
      id: 3,
      point: 9.3,
      price: '彈唱',
      title: '[音樂教學] 快速學會自彈自唱方法｜用超簡單和弦教會你',
      link: 'nM_Nz4gB2T8',
    },
    {
      category: 'front',
      courseImg:
        'https://i.ytimg.com/an_webp/QybMp-OkPhM/mqdefault_6s.webp?du=3000&sqp=CIuN-ZcG&rs=AOn4CLDanwatVaI5c9_POUXM9Ob5wvTtnQ',
      del: 0,
      id: 4,
      point: 9.2,
      price: '吉他',
      title: '新手必學吉他和弦-吉他初學4｜Wen吉他誌木吉他課程102',
      link: 'QybMp-OkPhM',
    },
    {
      category: 'front',
      courseImg:
        'https://i.ytimg.com/an_webp/qkt5X_4FJBY/mqdefault_6s.webp?du=3000&sqp=CL7u-JcG&rs=AOn4CLBs0WB5iGWHJaI_xN3_7bbtk6TJqA',
      del: 0,
      id: 5,
      point: 9.4,
      price: '樂理',
      title: '五線譜：一次搞懂所有你該知道的、基本的事情。',
      link: 'qkt5X_4FJBY',
    },
    {
      category: 'front',
      courseImg:
        'https://i.ytimg.com/an_webp/7ZDGgmN8atM/mqdefault_6s.webp?du=3000&sqp=CPD6-JcG&rs=AOn4CLCNq5enmtABdB99KlT0r5XObOY23g',
      del: 0,
      id: 6,
      point: 9.4,
      price: '管絃樂',
      title: '管弦樂器懶人包：一部影片就認識最常見的管弦樂團樂器！',
      link: '7ZDGgmN8atM',
    },
    {
      category: 'front',
      courseImg:
        'https://i.ytimg.com/vi/tOohMgZoQfA/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAPMe6x_WtZQtOkyp25qnxeWDibqA',
      del: 0,
      id: 7,
      point: 9.4,
      price: '樂理',
      title: '6415万能和弦歌曲大串烧！瞬间让多少人变成了音痴？',
      link: 'tOohMgZoQfA',
    },
  ],
  page: 1, //默認展示第一頁
  total: 15, //課程總數
});
/**
 * 分頁的邏輯
 */
const currentChange = (val: string) => {
  if (val === 'pre') {
    if (data.page > 1) {
      data.page--;
    } else {
      ElMessage({
        message: '已經是第一頁了！！！',
        type: 'warning',
        showClose: true,
      });
    }
  }
  if (val === 'next') {
    if (data.page < Math.ceil(data.total / 5)) {
      data.page++;
    } else {
      ElMessage({
        message: '已經是最後一頁了！！！',
        type: 'warning',
        showClose: true,
      });
    }
  }
  //請求課程的接口
};

/**
 * 搜索框的邏輯
 */
const inputValue = ref('');
//搜索的邏輯
const courseList = computed(() => {
  return data.list?.filter(item => {
    return item.title.indexOf(inputValue.value) >= 0;
  });
});
//搜索的按鈕
const handleClick = () => {
  if (inputValue.value) {
    ElMessage({
      message: '查詢成功',
      type: 'success',
    });
  } else {
    ElMessage({
      message: '請輸入搜索內容',
      type: 'error',
    });
  }
};

/**
 * 課程編輯的邏輯
 */
//編輯的數據
const courseItemState = reactive({
  message: {
    title: '',
    price: '',
  },
});
//控制編輯彈窗的展示變量
const popShow = ref(false);
//控制編輯彈窗的展示方法
const isShowPop = (show: boolean) => {
  popShow.value = show;
};
//編輯的按鈕
const editClick = (val: any) => {
  isShowPop(true);
  courseItemState.message = val;
};
//取消和確認按鈕邏輯
const confirmClick = (val: any) => {
  if (val === 'cancel') {
    isShowPop(false);
  } else if (
    val.title !== courseItemState.message.title ||
    val.price !== courseItemState.message.price
  ) {
    //更改對應課程的title或者price
    data.list.map(item => {
      if (item.id === val.id) {
        item.title = val.title;
        item.price = val.price;
      }
    });
    //關閉彈窗
    isShowPop(false);
    //修改接口的調用
  } else {
    ElMessage({
      showClose: true,
      message: '沒發現有更改的內容',
      type: 'warning',
    });
  }
};

/**
 * 課程刪除的邏輯
 */
const deleteHandle = (val: number) => {
  if (val) {
    data.list = data.list.filter(item => {
      return item.id !== val;
    });
    //刪除接口的調用
  }
};
</script>
<style lang="less" scoped>
.el-form {
  display: flex;
}

.main {
  background-color: #fff;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .input-with-select {
    width: 400px;
    margin-bottom: 40px;
  }
}

:deep(.el-table__header-wrapper) {
  z-index: 20;
}

:deep(.el-table__inner-wrapper) {
  overflow: hidden;
}

:deep(.el-table__body-wrapper) {
  margin-top: 40px;
}

:deep(.el-input__inner) {
  width: 300px;
  margin-right: 10px;
}

:deep(.warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9) !important;
  height: 140px !important;
}

.table {
  height: 80vh;
  width: 85vw;
  overflow: hidden;
  overflow-y: scroll;
}

.table::-webkit-scrollbar {
  display: none;
}
</style>
