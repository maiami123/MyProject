<template>
  <div class="all">
    <div>
      <section>
        <div class="color"></div>
        <div class="color"></div>
        <div class="color"></div>
        <div class="box">
          <div class="square" style="--i: 0"></div>
          <div class="square" style="--i: 1"></div>
          <div class="square" style="--i: 2"></div>
          <div class="square" style="--i: 3"></div>
          <div class="square" style="--i: 4"></div>
          <div class="square" style="--i: 5"></div>
          <div class="square" style="--i: 6"></div>
          <div class="container">
            <div class="form">
              <h2>註冊介面</h2>
              <form>
                <div class="inputBox">
                  <el-icon color="#ffeeee" :size="20"><Avatar /></el-icon>
                  <el-tooltip
                    :content="errorMessage.userName"
                    effect="light"
                    :visible="!!errorMessage.userName"
                    placement="right"
                  >
                    <input
                      type="text"
                      placeholder="請輸入帳號"
                      v-model.trim="userInfo.userName"
                      @click="errorMessage.userName = ''"
                    />

                    　
                  </el-tooltip>
                </div>
                <div class="inputBox">
                  <el-icon color="#ffffff" :size="20"><Key /></el-icon>
                  <el-tooltip
                    :content="errorMessage.password"
                    effect="light"
                    :visible="!!errorMessage.password"
                    placement="right"
                  >
                    <input
                      type="password"
                      placeholder="請輸入密碼"
                      v-model.trim="userInfo.password"
                      @click="errorMessage.password = ''"
                    />

                    　
                  </el-tooltip>
                </div>

                <div class="inputBox">
                  <el-icon color="#ffffff" :size="20"><Message /></el-icon>
                  <el-tooltip
                    :content="errorMessage.mail"
                    effect="light"
                    :visible="!!errorMessage.mail"
                    placement="right"
                  >
                    <input
                      type="text"
                      placeholder="請輸入信箱"
                      v-model.trim="userInfo.mail"
                      @click="errorMessage.mail = ''"
                    />

                    　
                  </el-tooltip>
                </div>

                <div class="inputBox">
                  <el-icon color="#ffffff" :size="20"><SuccessFilled /></el-icon>
                  <el-tooltip
                    :content="errorMessage.checkNum"
                    effect="light"
                    :visible="!!errorMessage.checkNum"
                    placement="right"
                  >
                    <input
                      type="text"
                      placeholder="請輸入驗證碼"
                      v-model.trim="userInfo.checkNum"
                      @click="errorMessage.checkNum = ''"
                    />

                    　
                  </el-tooltip>
                </div>

                <div class="inputBox">
                  <input type="submit" @click.prevent="registerSubmit" placeholder="註冊" />
                </div>
                <p class="forget">
                  已經有帳號啦!
                  <a href="#/login">點擊返回登入!</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import router from '../router/index';
import { reactive } from '@vue/reactivity';
import { getRegister } from '../api/index';
/**
 * DATA區塊
 */
//表單數據
const userInfo = reactive({
  userName: '',
  password: '',
  mail: '',
  checkNum: '',
});
//錯誤訊息
const errorMessage = reactive({
  userName: '',
  password: '',
  mail: '',
  checkNum: '',
});

/**
 * 函數區塊
 */

//表單驗證函數
const checkForm = () => {
  let pass = true;

  for (let i in errorMessage) {
    errorMessage[i] = '';
  }

  if (!userInfo.userName) {
    errorMessage.userName = '請輸入帳號';
    pass = false;
  }
  if (!userInfo.password) {
    errorMessage.password = '請輸入密碼';
    pass = false;
  }

  if (!userInfo.mail) {
    errorMessage.mail = '請輸入信箱';
    pass = false;
  }

  if (!userInfo.checkNum) {
    errorMessage.checkNum = '請輸入驗證碼';
    pass = false;
  }
  return pass;
};

//提交函數
const registerSubmit = async () => {
  if (checkForm()) {
    //調用接口

    const { data: res } = await getRegister({
      userName: userInfo.userName,
      password: userInfo.password,
    });
    console.log(res);
    if (res?.message) {
      ElMessage({
        message: '註冊成功!!',
        type: 'success',
      });
      router.push('/login');
    }
  }
};
</script>

<style lang="less" scoped>
.all {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
body {
  overflow: hidden;
}
section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f1f4f9, #dff1ff);
}
section .color {
  position: absolute;
  filter: blur(200px);
}
section .color:nth-child(1) {
  top: -350px;
  width: 1500px;
  height: 700px;
  background: #ff359b;
}

section .color:nth-child(2) {
  bottom: -140px;
  left: 100px;
  width: 800px;
  height: 600px;
  background: #873cffd1;
}

section .color:nth-child(3) {
  bottom: 50px;
  right: 100px;
  width: 500px;
  height: 400px;
  background: #65b3c4;
}
.box {
  position: relative;
}

.box .square {
  position: absolute;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  animation: animate 10s linear infinite;
  animation-delay: calc(-1s * var(--i));
}

@keyframes animate {
  0%,
  100% {
    transform: translateY(-40px);
  }
  50% {
    transform: translateY(40px);
  }
}

@keyframes fadeInAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.box .square:nth-child(1) {
  top: -50px;
  right: -60px;
  width: 100px;
  height: 100px;
}

.box .square:nth-child(2) {
  top: 150px;
  left: -100px;
  width: 120px;
  height: 120px;
  z-index: 2;
}

.box .square:nth-child(3) {
  bottom: 50px;
  right: -60px;
  width: 80px;
  height: 80px;
  z-index: 2;
}

.box .square:nth-child(4) {
  bottom: -80px;
  left: 100px;
  width: 50px;
  height: 50px;
}

.box .square:nth-child(5) {
  top: -80px;
  left: 140px;
  width: 60px;
  height: 60px;
}

.box .square:nth-child(6) {
  top: 50px;
  left: -300px;
  width: 100px;
  height: 100px;
}

.box .square:nth-child(7) {
  bottom: 80px;
  right: 30px;
  width: 60px;
  height: 60px;
}

.container {
  position: relative;
  width: 400px;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeInAnimation ease 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.form {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 40px;
  text-align: center;
}
.form h2 {
  position: relative;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 40px;
}

.form h2::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  widows: 80px;
  height: 4px;
  background: #fff;
}

.form .inputBox {
  width: 100%;
  margin-top: 20px;
}

.form .inputBox input {
  width: 60%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 35px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  letter-spacing: 1px;
  color: #fff;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.05);
}

.form .inputBox input::placeholder {
  color: #fff;
}

.form .inputBox input[type='submit'] {
  background: #fff;
  color: #666;
  max-width: 100px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: 600;
}

.form .inputBox input:hover,
.form .inputBox input:focus {
  box-shadow: 2px 2px 10px rgb(210, 232, 254);
  background-color: hsla(291, 100%, 96%, 0.424);
  transition: 0.25s;
}

.form .inputBox input[type='password']:focus,
.form .inputBox input[type='text']:focus {
  transition: 0.25s;
  width: 80%;
}

.forget {
  margin-top: 5px;
  color: #fff;
  font-size: large;
}

.forget a {
  color: #fff;
  font-weight: 600;
}
.forget a:hover {
  color: #40a0ff95;
  font-size: x-large;
  transition: 0.25s;
}

.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>
