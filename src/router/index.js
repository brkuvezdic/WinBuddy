import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoggedInHomeScreen from "@/views/LoggedInHomeScreen.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/loggedinhomescreen",
    name: "/loggedinhomescreen",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoggedInHomeScreen.vue"),
  },
  {
    path: "/findplayers",
    name: "/findplayers",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/FindPlayers.vue"),
  },
  {
    path: "/news",
    name: "/news",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/News.vue"),
  },
  {
    path: "/register",
    name: "register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
