import { apiHelper } from '../utils/helper'

// 暫時先取用 local storage 的 token

export default {
  // 取得最新的推文列
  getNewestTweets() {
    return apiHelper.get('/tweets')
  },
  // 新增一筆 tweet
  createTweet({ description }) {
    return apiHelper.post(`/tweets`, description)
  },
  // 取得特定一筆推文
  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  // 發布給特定推文的回文
  createTweetReply ({ tweetId , comment }) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, { comment })
  },
  // 取得給特定推文的所有回文
  getTweetReplies ({ tweetId }) {
    return apiHelper.get(`tweets/${tweetId}/replies`)
  }
}
