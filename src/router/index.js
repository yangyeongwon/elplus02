import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/home.vue";
import { useAuthStore } from '../store/auth'

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: 'dashboard'
        },
        component: () =>  import (/* webpackChunkName: "dashboard" */"../views/dashboard.vue")
      },{
        path: '/user',
        name: 'user',
        meta: {
          title: 'user'
        },
        component: () =>  import (/* webpackChunkName: "user" */"../views/user.vue")
      },
      {
        path: '/menu',
        name: 'menu',
        meta: {
          title: 'menu'
        },
        component: () =>  import ("../views/menu.vue")
      },
      {
        path: '/:pathMatch(.*)',
        redirect: '/404'
      }
    ]
  }  
  ,{
    path: "/login",
    name: "login",
    meta: { title: '로그인' },
    component: () => import (  "../views/login.vue")
  },
  {
    path: '/404',
    name: 'notFound',
    meta: {
      title: '404error'
    },
    component: () =>  import ("../views/404.vue")
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-element-plus`;
  const auth = useAuthStore();
  // console.log(auth.getAuth);
  // const role = JSON.parse(localStorage.getItem('auth'));
  // const role = localStorage.getItem('ms_username');
  // const permiss = usePermissStore();
  if ((!auth.getAuth || !auth.getUserId) && to.path !== '/login') {
      next('/login');
  } else {
      next();
  }
});

export default router;