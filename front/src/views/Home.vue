<template>
  <PageMain :handleMode="classMode">
    <div class="btn-box">
      <div @click="change('light')">
        <el-icon>
          <Sunrise />
        </el-icon>
        照耀模式
      </div>

      <div @click="change('dark')">
        <el-icon>
          <MoonNight />
        </el-icon>
        夜幕模式
      </div>
    </div>

    <div class="clockMode">
      <div class="clock">
        <div class="time">
          <h2 id="hour">{{ baseData.Data.hour }}</h2>
          <h2 class="dot">:</h2>
          <h2 id="minute">{{ baseData.Data.minute }}</h2>
          <h2 class="dot">:</h2>
          <h2 class="seconds">{{ baseData.Data.seconds }}</h2>
          <span id="ampm">{{ baseData.Data.ampm }}</span>
        </div>
      </div>
    </div>

    <div :class="classMode" id="container">
      <div class="bg"></div>

      <div class="moon-box">
        <div class="moon"></div>
      </div>

      <div class="sun-box">
        <div class="sun"></div>
      </div>
    </div>

    <div class="sea-box">
      <div class="wave"></div>
      <div class="sea"></div>
    </div>
  </PageMain>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import PageMain from '../components/PageMain.vue';
import { useStore } from 'vuex';
import '../style/home.css';
import { reactive } from '@vue/reactivity';
import moment from 'moment';
import { onMounted } from '@vue/runtime-core';
import { baseData } from '../interface/Home.Interface';

/**
 * mounted
 */
onMounted(() => {
  //Time
  const timer = setInterval(() => {
    baseData.Data.hour = moment(new Date()).format('HH');

    baseData.Data.minute = moment(new Date()).format('mm');

    baseData.Data.seconds = moment(new Date()).format('ss');

    Number(baseData.Data.hour) >= 12 ? (baseData.Data.ampm = 'PM') : (baseData.Data.ampm = 'AM');
  }, 1000);
});

/**
 * Data
 */

//狀態管理
const store = useStore();
const classMode = ref(store.state.classMode);

/**
 * function
 */
function change(mode: String) {
  classMode.value = mode;
  setTimeout(() => {
    store.state.classMode = mode;
    console.log(store.state.classMode);
  }, 1000);
}
</script>

<style lang="less" scoped></style>
