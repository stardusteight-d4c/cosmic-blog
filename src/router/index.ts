import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CreatePost from '../pages/CreatePost.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
