import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CreatePost from '../pages/CreatePost.vue'
import Home from '../pages/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
