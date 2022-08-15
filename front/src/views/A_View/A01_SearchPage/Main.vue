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
      courseImg: 'https://cdn.unwire.hk/wp-content/uploads/2015/06/0604-2a-694x463.jpg',
      del: 0,
      id: 1,
      point: 9.8,
      price: '99',
      title: 'Big大漢堡',
    },
    {
      category: 'front',
      courseImg: 'https://cdn2.ettoday.net/images/743/d743195.jpg',
      del: 0,
      id: 2,
      point: 9.5,
      price: '99',
      title: '真好食港式餐廳',
    },
    {
      category: 'front',
      courseImg:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStGEPS4MU8INeFv9SVc6DDYIUgMyNvapQVEhRBlihkFggUlRBXET5HNNShZC5qqvuqQYY&usqp=CAU',
      del: 0,
      id: 3,
      point: 9.3,
      price: '59',
      title: '健康朝氣沙拉',
    },
    {
      category: 'front',
      courseImg:
        'https://imgsrv2.voi.id/Uo4o4rn1EfpsIYhQxqTAacGsCYG7_xOrhKgn1G5wJjM/auto/1200/675/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy83NzkyMC8yMDIxMDgyMTE3MTgtbW9iaWxlLmNyb3BwZWRfMTYyOTU0MTEwNi5qcGVn.jpg',
      del: 0,
      id: 4,
      point: 9.2,
      price: '109',
      title: '豪華牛肉套餐',
    },
    {
      category: 'front',
      courseImg: 'https://global-blog.cpcdn.com/tw/2020/02/cooked-ramen-1907228.jpg',
      del: 0,
      id: 5,
      point: 9.4,
      price: '49',
      title: '老虎辣麵',
    },
    {
      category: 'front',
      courseImg: 'https://global-blog.cpcdn.com/tw/2020/02/cooked-ramen-1907228.jpg',
      del: 0,
      id: 6,
      point: 9.4,
      price: '49',
      title: '老虎辣麵2',
    },
    {
      category: 'front',
      courseImg: 'https://global-blog.cpcdn.com/tw/2020/02/cooked-ramen-1907228.jpg',
      del: 0,
      id: 7,
      point: 9.4,
      price: '49',
      title: '老虎辣麵3',
    },
  ],
  page: 1, //默認展示第一頁
  total: 15, //課程總數
});
/**
 * 分頁的邏輯
 */
const currentChange = (val:string) => {
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
    title:'',
    price:''
  },
});
//控制編輯彈窗的展示變量
const popShow = ref(false);
//控制編輯彈窗的展示方法
const isShowPop = (show:boolean) => {
  popShow.value = show;
};
//編輯的按鈕
const editClick = (val:any) => {
  isShowPop(true);
  courseItemState.message = val;
};
//取消和確認按鈕邏輯
const confirmClick = (val:any) => {
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
const deleteHandle = (val:number) => {
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
