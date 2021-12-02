import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'
import Tweets from '../views/Tweets.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/tweets',
    name: 'tweets',
    component: Tweets,
  },
  {
    path: '/tweet/:id/replies',
    name: 'tweet-replies',
    component: () => import('../views/TweetReplies.vue')
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/user/:id/follow',
    name: 'user-follow',
    component: () => import('../views/UserFollow.vue')
  },
  {
    path: '/user/:id/setting',
    name: 'account-setting',
    component: () => import('../views/Setting.vue')
  },
  {
    path: '/admin',
    name: 'admin-root',
    redirect: '/admin/login'
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/AdminLogin.vue')
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

export default router
