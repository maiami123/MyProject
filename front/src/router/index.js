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
      path: '/home',
      component: () => import('../views/Home'),
      meta: {
        isAuth: true,
      },
    },
    {
      path: '/login',
      component: () => import('../views/Login'),
    },
    {
      path: '/register',
      component: () => import('../views/Register'),
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
