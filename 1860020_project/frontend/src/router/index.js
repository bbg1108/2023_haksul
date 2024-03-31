import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Find from '../views/Find.vue'
import Schedule from '../views/Schedule.vue'
import Subscribe from '../views/Subscribe.vue';
import axios from 'axios';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Login
  },
  {
    path: '/find',
    name: 'Find',
    component: Find
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule
  },
  {
    path: '/subscribe',
    name: 'Subscribe',
    component: Subscribe
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/*router.beforeEach((to, from, next) => {
  axios.get('http://localhost:8000/check-session', { withCredentials: true })
    .then(response => {
      // 서버에서 세션 확인에 성공한 경우
      next();
    })
    .catch(error => {
      // 세션 없거나 확인에 실패한 경우
      if (to.path === '/login' || to.path === '/signup') {
        // 로그인 및 회원가입 경로는 허용
        next();
      } else {
        // 다른 경로로의 접근 차단
        next('/login'); // 또는 다른 리다이렉션 로직을 추가하세요.
      }
    });
})*/

export default router
