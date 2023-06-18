import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CreatePost from "../pages/CreatePost.vue";
import Home from "../pages/Home.vue";
import Post from "../pages/Post.vue";
import Profile from "../pages/Profile.vue";
import Login from "../pages/Login.vue";
import NotFoundVue from "@/components/@globals/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/create-post",
    name: "create-post",
    component: CreatePost,
  },
  // {
  //   path: "/tag", tag?equals=typescript
  //   name: "tag",
  //   component: Profile,
  // },
  {
    path: "/post/:slug",
    name: "post",
    component: Post,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/profile/:username",
    name: "profile",
    component: Profile,
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: NotFoundVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
