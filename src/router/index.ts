import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Home from '@/views/Home.vue';
import store from "@/store";
import Login from "@/views/Login.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

store.subscribe((m, state) => {
  console.log(state.user);
})

export default router;
