<template>
  <div class="main">
    <el-scrollbar height="100%" min-size="50">
      <div class="bg1">
        <div class="tab">
          <el-button type="primary" :icon="Close" plain @click="handleMusicTag(null)" />
          <div class="song">你好不好</div>

          <div class="songInfo">
            <div class="tabHead">
              <span class="headLeft">
                <div>
                  <span class="singer">演唱:周興哲</span>
                </div>
                <span class="word">詞:周興哲/吳易緯</span>
                <span class="maker">曲:周興哲</span>
              </span>

              <span class="headRight">
                <span class="key">原調:Bb</span>
                <span class="bpm">速度:80</span>
              </span>
            </div>
          </div>

          <div class="songDetail">
            <div class="detailCode">
              [前奏]｜G　｜D/F#　｜Em　｜Bm/D　｜C　｜Bm7　Em　｜Am7　｜D　｜
            </div>
            <div class="detailCode">　</div>
            <div class="detailCode">
              　　　｜G　　　　｜D/F#　｜Em　　　　　｜Bm/D　｜C　　｜Bm7　Em　｜Am7　　｜D　｜
            </div>
            <div class="detailWord">
              是不是　還那麼愛遲到　熬夜工作　又睡不好　等你　完成你的目標　要戒掉逞強的嗜好
            </div>

            <div class="detailCode">
              　　　｜G　　　　｜D/F#　｜Em　　　　｜Bm/D　｜C　　｜Bm7　Em　｜Am7　　　｜D　｜
            </div>
            <div class="detailWord">
              1.都怪我　把自尊放太高　沒有把你照顧好　驕傲　是脆弱的外表　最怕我的心　你不要
            </div>
            <div class="detailWord">
              2.天知道　我快要受不了　後悔鑽進心裡燒　擁抱　再多一次就好　你要的我都　做得到
            </div>

            <div class="detailCode">
              　　　　　　　　　｜G　　　　｜D/F#　　　　　　　｜Em　　　　　｜Bm/D　｜
            </div>
            <div class="detailWord">
              能不能繼續　對我哭　對我笑　對我好　繼續讓我　為你想　為你瘋　陪你老
            </div>

            <div class="detailCode">　　　　　｜C　　　｜Bm7　Em　｜Am7　　　｜D　｜</div>
            <div class="detailWord">1.你好不好　好想知道　　別急著把回憶都丟掉</div>
            <div class="detailWord">2.給你的好　還要不要　　答案我卻不敢揭曉</div>
            <div class="detailWord">3.你好不好　好想知道　　別急著把回憶都丟掉</div>

            <div class="detailCode">
              　　　　　　　　｜G　　　　　｜D/F#　　　　　　｜Em　　　　　｜Bm/D　｜
            </div>
            <div class="detailWord">
              1.我只需要你　在身邊　陪我吵　陪我鬧　用好的我　把過去壞的我　都換掉
            </div>
            <div class="detailWord">
              2.我只需要你　在身邊　陪我吵　陪我鬧　別用　離開教我　失去的人最重要
            </div>
            <div class="detailWord">
              3.我只需要你　在身邊　陪我吵　陪我鬧　別用　離開教我　失去的人最重要
            </div>

            <div class="detailCode">　　　　　｜C　　　｜Bm7　Em　｜Am7　　　｜D　｜</div>
            <div class="detailWord">1.好想聽到　你堅決說愛我　可惜回不去那一秒　你好不好？</div>
            <div class="detailWord">2.　　別說　你曾經愛過我　讓我們回到那一秒　你好不好？</div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { Close } from '@element-plus/icons-vue';
let model = defineProps(['handleMusicTag']);
</script>

<style lang="less">
.main {
  width: 100%;
  height: 100%;
}

.bg1 {
  margin-left: 10%;
}

.tab {
  margin: 10px 0 100px 0;
  width: 768px;
  height: 1024px;
  background: url(../../../assets/paper.jpg);
  box-shadow: 0px 20px 20px 10px #bfb9b9;
  position: relative;
  overflow: hidden;
}

.song {
  position: relative;
  top: 50px;
  text-align: center;
  font-size: 40px;
  color: #5d77ff;
  font-weight: bold;
}
.songInfo span {
  margin: 10px;
}

.tabHead {
  display: flex;
}
.headLeft {
  flex: 0.5;
}
.headRight {
  flex: 0.5;
  text-align: end;
}
.songDetail {
  width: 100%;
  margin-top: 10px;
}
.songDetail .detailWord {
  padding: 5px;
  margin-left: 30px;
  display: flex;
  justify-content: start;
  align-items: center;
}

.songDetail .detailCode {
  background: #dadada61;
  padding: 5px;
}
</style>
