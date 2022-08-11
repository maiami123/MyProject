import { createRouter, createWebHashHistory } from 'vue-router';

//路由配置
const router = createRouter({
  history: createWebHashHistory(), //選擇哈西路由
  routes: [
    {
      //初始頁面
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('../views/Login'),
    },
    {
      path: '/register',
      component: () => import('../views/Register'),
    },
    //首頁
    {
      path: '/home',
      component: () => import('../views/Home'),
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

        
    /**
     * Z_view
     */

    //Z01用戶權限
    {
      path: '/auth',
      component: () => import('../views/Z_View/Z01_Auth/AuthMain.vue'),
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
  ],
});

//路由攔截
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (localStorage.getItem('token')) {
      next();
      console.log(2);
    } else {
      ElMessage.error('記得要先登入喔!');
      router.push('/login');
    }
  } else {
    next();
    console.log(1);
  }
});
export default router;
