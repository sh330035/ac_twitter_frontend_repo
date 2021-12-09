import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'
import Tweets from '../views/Tweets.vue'
import store from '../store'

Vue.use(VueRouter)

// 避免非管理者進入管理者頁面
const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role !== 'admin') {
    next('/404')
    return
  }
  next()
}

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
    component: Tweets
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
    component: () => import('../views/AdminTweets.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
    beforeEnter: authorizeIsAdmin
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

router.beforeEach(async (to, from, next) => {
  console.log('to', to)
  console.log('from', from)
  const token = localStorage.getItem('token')
  // 預設是尚未驗證
  let isAuthenticated = false
  if (token) {
    // 取得驗證成功與否
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  const pathsWithoutAuthentication = ['login', 'register', 'admin-login']

  // 如果 token 無效則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    // 控制 Toast
    store.commit('alert')
    setTimeout(() => {
      store.commit('alert')
    }, 2450)
    next('/login')
    return
  }

  console.log(store.state.currentUser.role)

  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    if (store.state.currentUser.role == 'user') {
      next('/tweets')
      return
    } else if (store.state.currentUser.role == 'admin') {
      next('/admin/tweets')
    }
  }

  next()
})

export default router
