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
    path: '/block/:hash',
    name: 'Block-details',
    props: true,
    component: () => import(/*webpackChunkName: "block-details" */ '../views/Block-details.vue')
  },
  {
    path: '/block2/:hash',
    name: 'Block-details2',
    props: true,
    component: () => import(/*webpackChunkName: "block-details2" */ '../views/Block-details2.vue')
  },
  {
    path: '/home2',
    name: 'Home2',
    component: () => import(/*webpackChunkName: "home2" */ '../views/HomeVuetify.vue')
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
