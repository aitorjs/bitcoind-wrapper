import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/*webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/home2',
    name: 'Home2',
    component: () => import(/*webpackChunkName: "home2" */ '../views/HomeVuetify.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/*webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/grid',
    name: 'Grid',
    component: () => import(/*webpackChunkName: "grid" */ '../views/Grid.vue')
  },
  {
    path: '/botones',
    name: 'Botones',
    component: () => import(/*webpackChunkName: "grid" */ '../views/Botones.vue')
  },
  {
    path: '/tareas-crud',
    name: 'Tareas-crud',
    component: () => import(/*webpackChunkName: "grid" */ '../views/Tareas-crud.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
