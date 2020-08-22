import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import UserActivation from "../views/UserActivation";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/activate/:uid/:token',
      name: 'UserActivation',
      component: UserActivation
    }
]

const router = new VueRouter({
  routes
})

export default router
