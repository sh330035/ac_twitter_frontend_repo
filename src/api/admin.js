import { apiHelper } from '../utils/helper'

export default {
  // 管理員登入
  adminSignIn ({ email, password}) {
    return apiHelper.post(`/admin/signin`,{ email, password})
  },
  // 取得管理員可見的所有用戶清單
  getAdminUsers () {
    return apiHelper.get(`/admin/users`)
  },
  // 取得管理員可見的 tweet 清單
  getAdminTweets () {
    return apiHelper.get(`admin/tweets`)
  },
  // 管理員刪除特定一筆 tweet
  deleteTweet ({ tweetId }) {
    return apiHelper.delete(`/admin/tweets/${ tweetId }`)
  }
}

