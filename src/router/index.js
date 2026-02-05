import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'
import Projects from '@/views/Projects.vue'
import PersonalHomepage from '@/views/Layout/PersonalHomepage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/',
    redirect: '/login' // 这里改为重定向到登录页
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'personal', component: PersonalHomepage },
      { path: 'projects', component: Projects }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

// 关键：添加这行导出语句
export default router
