import Vue from 'vue'
import VueRouter from 'vue-router'
import TestPage from '../views/TestPage.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'test-page',
    component: TestPage
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue')
  // }
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
