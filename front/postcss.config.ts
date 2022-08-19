module.exports = {
  plugins: {
    tailwindcss: {},
    // 兼容瀏覽器，添加前綴
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 37.5, //結果為：設計稿元素尺寸/16，比如元素寬320px,最終頁面會換算成 20rem
      propList: ["*"], //是一個存儲哪些將被轉換的屬性列表，這里設置為['*']全部，假設需要僅對邊框進行設置，可以寫['*', '!border*']
      unitPrecision: 5, //保留rem小數點多少位
      //selectorBlackList: ['.radius'],  //則是一個對css選擇器進行過濾的數組，比如設置為['fs']，那例如fs-xl類名，里面有關px的樣式將不被轉換，這里也支持正則寫法。
      replace: true,
      mediaQuery: false, //媒體查詢( @media screen 之類的)中不生效
      minPixelValue: 12, //px小於12的不會被轉換
    },
  },
}