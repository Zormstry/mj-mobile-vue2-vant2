import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue' // 这个是布局组件
import Detail from '@/views/Detail.vue'
import Projects from '@/views/Projects.vue'

import Article from '@/views/Layout/Article.vue'
import Collect from '@/views/Layout/Collect.vue'
import Like from '@/views/Layout/Like.vue'
import User from '@/views/Layout/User.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/detail', component: Detail },
  {
    path: '/',
    redirect: '/article',
    component: Home,
    children: [
      { path: 'article', component: Article },
      { path: 'collect', component: Collect },
      { path: 'like', component: Like },
      { path: 'user', component: User },

      {
        path: 'projects',
        name: 'Projects',
        component: Projects
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
