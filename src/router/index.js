import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import UserActivation from "../views/UserActivation";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/newest/',
    name: 'Home',
    component: Home
  },
    {
      path: '/tag/:name',
      name: 'Tag',
      component: Home
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login
    },
    {
      path: '/activate/:uid/:token/',
      name: 'UserActivation',
      component: UserActivation
    }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
