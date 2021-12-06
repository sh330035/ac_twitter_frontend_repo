import { apiHelper } from '../utils/helper'

// 暫時先取用 local storage 的 token

export default {
  // 管理員登入
  // router.post('/admin/signin', adminController.signIn)
  adminSignIn({ account, password }) {
    return apiHelper.post(`/admin/signin`, { account, password })
  },
  // 取得管理員可見的所有用戶清單
  // router.get('/admin/users', authenticated, authenticatedAdmin, adminController.getUsers)
  getAdminUsers() {
    return apiHelper.get(`/admin/users`)
  },
  // 取得管理員可見的 tweet 清單
  // router.get('/admin/tweets', authenticated, authenticatedAdmin, adminController.getTweets)
  getAdminTweets() {
    return apiHelper.get(`admin/tweets`)
  },
  // 管理員刪除特定一筆 tweet
  // router.delete('/admin/tweets/:id', authenticated, authenticatedAdmin, adminController.deleteTweet)
  deleteTweet({ tweetId }) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`)
  }
}
