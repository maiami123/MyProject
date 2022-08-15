import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  //初始頁面
  {
    path: '/',
    name: '/home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    component: () => import('../views/Register.vue')
  },
  //Z01用戶權限
  {
    path: '/auth',
    component: () => import('../views/Z_View/Z01_Auth/AuthMain.vue'),
    meta: {
      isAuth: true,
    },
  },


  /**
     * A__view
     */

      //A01搜尋功能頁
      {
        path: '/searchSomething',
        component: () => import('../views/A_View/A01_SearchPage/index.vue'),
        meta: {
          isAuth: true,
        },
    },
      //A02樂譜庫
      {
        path: '/musicTab',
        component: () => import('../views/A_View/A02_MusicTab/index.vue'),
        meta: {
          isAuth: true,
        },
      },
      //A03我的樂譜
      {
        path: '/myMusic',
        component: () => import('../views/A_View/A03_MyMusic/index.vue'),
        meta: {
          isAuth: true,
        },
      },
      
  /**
  * B_view
  */
  //B01 基礎3D
        {
          path: '/base3D',
          component: () => import('../views/B_View/B01_Base3D/index.vue'),
          meta: {
            isAuth: true,
          },
        },

        
  //Z02帳號設置
  {
    path: '/account',
    component: () => import('../views/Z_View/Z02_Account/AccountMain.vue'),
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../views/404.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
