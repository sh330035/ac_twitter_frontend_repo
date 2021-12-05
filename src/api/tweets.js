import { apiHelper } from '../utils/helper'

// 暫時先取用 local storage 的 token
const getToken = () => localStorage.getItem('token')

export default {
  getNewestTweets() {
    return apiHelper.get('/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
