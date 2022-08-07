<template>
  <PageMain>
    <div class="formBody">
      <div class="card">
        <div class="upload">
          <el-upload
            v-model:file-list="fileList"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :limit="1"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </div>

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
            <el-input show-password placeholder="修改密碼" v-model="userInfo.password" />
          </el-form-item>
        </el-form>

        <div class="btn-group">
          <el-button color="#626aef" @click="router.back()" plain>取消</el-button>
          <el-button color="#626aef" class="btn-sumbit" @click="submit">修改</el-button>
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
import { toRaw } from '@vue/reactivity';
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
const userInfo = reactive({ name: '', password: '', headImg: '' });
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const fileList = ref([]);

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
    fileList.value.push({
      name: userInfo.name,
      url: userInfo.headImg,
    });
  }
};

const submit = async () => {
  console.log(toRaw(fileList.value)[0]?.raw);
  let file = toRaw(fileList.value)[0]?.raw;
  ElMessageBox.confirm('是否要修改頭像或是密碼。', {
    confirmButtonText: '確認',
    cancelButtonText: '取消',
    type: 'warning',
    center: true,
  })
    .then(() => {
      if (userInfo.password == '' && file == undefined) {
        ElMessage({
          type: 'error',
          message: '請上傳頭像或是輸入需修改之密碼',
        });
      } else {
        ElMessage({
          type: 'success',
          message: '修改成功',
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      });
    });
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

.card:hover {
  animation: animate 1s;
}

@keyframes animate {
  0% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
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
.upload {
  text-align: center;
}
</style>
