import { apiHelper } from '../utils/helper'

// 暫時先取用 local storage 的 token
const getToken = () => localStorage.getItem('token')

export default {
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // user page information
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserReply({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserLike({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // user follow page information
  getUserFollowings(userId) {
    return apiHelper.get(`/users/${userId}/followings`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserFollowers(userId) {
    return apiHelper.get(`/users/${userId}/followers`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // popular users card
  getPopularUsers() {
    return apiHelper.get('/users/top', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // follow button api
  // 須研究如何不用 userId 啟動
  addFollowing() {
    return apiHelper.post(`/followships`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteFollowing({ userId }) {
    return apiHelper.delete(`/followships/${userId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // notice button api
  // 須研究如何不用 userId 啟動
  addNotice() {
    return apiHelper.post(`/notice`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteNotice({ userId }) {
    return apiHelper.delete(`/notice/${userId}`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // like tweet button api
  addLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
