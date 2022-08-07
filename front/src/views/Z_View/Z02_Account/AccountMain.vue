<template>
  <PageMain>
    <div class="formBody">
      <div class="card">
        <el-radio-group v-model="labelPosition" label="label position"></el-radio-group>
        <div style="margin: 20px" />
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="formLabelAlign"
          style="max-width: 460px"
          class="contain"
        >
          <el-form-item label="用戶名" class="input_title">
            <el-input v-model="userInfo.name" :disabled="true" />
          </el-form-item>
          <el-form-item label="密碼" class="input_title">
            <el-input v-model="formLabelAlign.type" />
          </el-form-item>
        </el-form>

        <div class="btn-group">
          <el-button color="#626aef" @click="router.back()" plain>取消</el-button>
          <el-button color="#626aef" class="btn-sumbit">修改</el-button>
        </div>
      </div>
    </div>
  </PageMain>
</template>

<script setup>
import PageMain from '../../../components/PageMain.vue';
import { reactive, ref } from 'vue';
import { onMounted } from '@vue/runtime-core';
import { getUserInfo } from '../../../api';
import router from '../../../router';
/**
 * Mounted
 */
onMounted(() => {
  getUserInfoData();
});

/**
 * Data
 */
const labelPosition = ref('top');
const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
});
const userInfo = reactive({ name: '', headImg: '' });

/**
 * Function
 */
const getUserInfoData = async () => {
  const { data: res } = await getUserInfo();
  console.log(res);
  if (res?.data.headImg && res?.data.name) {
    console.log('ok');
    userInfo.name = res.data.name;
    userInfo.headImg = res.data.headImg;
  }
};
</script>

<style lang="less" scoped>
.formBody {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.card {
  width: 400px;
  height: 50%;
  padding: 100px;
  border-radius: 20px;
  background: #f5f5f5;
  box-shadow: 0 25px 35px 25px rgba(0, 0, 0, 0.2);
  margin: 0 10px;
  border-bottom: 20px solid rgba(255, 255, 255, 0.1);
  border-right: 20px solid rgba(255, 255, 255, 0.1);
}

.btn-group {
  padding: 100px;
  text-align: center;
}
.btn-sumbit {
  text-align: center;
}
.el-form-item__label {
  text-align: center !important;
}
</style>
