import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CreatePost from '../pages/CreatePost.vue'
import Home from '../pages/Home.vue'
import Post from '../pages/Post.vue'
import Profile from '../pages/Profile.vue'
import Login from '../pages/Login.vue'

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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: Profile,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
