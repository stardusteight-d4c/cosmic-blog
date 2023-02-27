import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NewPost from '../pages/NewPost.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/new-post',
    name: 'NewPost',
    component: NewPost,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
