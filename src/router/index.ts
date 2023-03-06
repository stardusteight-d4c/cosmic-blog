import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CreatePost from '../pages/CreatePost.vue'
import Home from '../pages/Home.vue'
import Post from '../pages/Post.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
