import { apiHelper } from '../utils/helper'

// 暫時先取用 local storage 的 token

export default {
  // 取得最新的推文列
  // router.get('/tweets', authenticated, tweetController.getTweets)
  getNewestTweets() {
    return apiHelper.get('/tweets')
  },
  // 新增一筆 tweet
  // router.post('/tweets', authenticated, tweetController.postTweet)
  createTweet({ description }) {
    return apiHelper.post(`/tweets`, { description })
  },
  // 取得特定一筆推文
  // router.get('/tweets/:tweet_id', authenticated, tweetController.getTweet)
  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  // 發布給特定推文的回文
  // router.post('/tweets/:tweet_id/replies', authenticated, replyController.postReply)
  createTweetReply ({ tweetId , description }) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, { description })
  },
  // 取得給特定推文的所有回文
  // router.get('/tweets/:tweet_id/replies', authenticated, replyController.getReply)
  getTweetReplies ({ tweetId }) {
    return apiHelper.get(`tweets/${tweetId}/replies`)
  }
}