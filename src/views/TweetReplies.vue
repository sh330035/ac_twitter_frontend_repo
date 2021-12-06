<template>
  <div class="tweet-replies">
    <section class="center-view">
      <page-name-banner
        :banner-title="bannerTitle"
        :banner-link-back="bannerLinkBack"
      />
      <tweet-card
        :initial-tweet="tweet"
        @after-show-reply-modal="afterShowReplyModal"
        @after-add-like="afterAddLike"
        @after-delete-like="afterDeleteLike"
      />
      <reply-list :tweet="tweet" />
    </section>
    <section class="right-card">
      <popular-users-card />
    </section>
    <reply-model
      v-show="showReplyModal"
      :reply-tweet="tweet"
      @after-comment-checkout="afterCommentCheckout"
    />
    <Toast :ToastMessage="ToastMessage" />
  </div>
</template>

<script>
import PageNameBanner from "../components/PageNameBanner.vue"
import TweetCard from '../components/TweetCard.vue'
import ReplyList from '../components/ReplyList.vue'
import PopularUsersCard from "../components/PopularUsersCard.vue"
import ReplyModel from "../components/ReplyModel.vue"
import Toast from "../components/AlertToast.vue"
import tweetsAPI from '../api/tweets.js'
import usersAPI from '../api/users.js'

// const dummyData = {
//   tweet: {
//     "id": 1,
//     "UserId": 1,
//     "account": "user1",
//     "name": "User1",
//     "avatar": "https://randomuser.me/api/portraits/women/5.jpg",
//     "description": "vitae molestiae deserunt",
//     "createdAt": "2021-11-30T10:14:55.000Z",
//     "updatedAt": "2021-11-30T10:14:55.000Z",
//     "Replies": [
//       {
//         "id": 1,
//         "UserId": 50,
//         "account": "user50",
//         "name": "User50",
//         "comment": "vitae molestiae deserunt",
//         "avatar": "https://randomuser.me/api/portraits/men/5.jpg",
//         "createdAt": "2021-12-03T10:14:55.000Z",
//       },
//       {
//         "id": 6,
//         "UserId": 6,
//         "account": "user6",
//         "name": "User6",
//         "comment": "Non autem deleniti perspiciatis architecto.",
//         "avatar": "https://randomuser.me/api/portraits/women/7.jpg",
//         "createdAt": "2021-11-29T10:14:55.000Z",
//       },
//       {
//         "id": 9,
//         "UserId": 8,
//         "account": "user8",
//         "name": "User8",
//         "comment": "Laboriosam aut fugit eaque molestiae aspernatur velit fugit laudantium.",
//         "avatar": "https://randomuser.me/api/portraits/men/6.jpg",
//         "createdAt": "2021-11-28T10:14:55.000Z",
//       },
//       {
//         "id": 10,
//         "UserId": 10,
//         "account": "user10",
//         "name": "User10",
//         "comment": "fuga modi ipsa",
//         "avatar": "https://randomuser.me/api/portraits/women/22.jpg",
//         "createdAt": "2021-11-26T10:14:55.000Z",
//       },
//       {
//         "id": 11,
//         "UserId": 1,
//         "account": "user1",
//         "name": "User1",
//         "comment": "vitae molestiae deserunt",
//         "avatar": "https://randomuser.me/api/portraits/women/11.jpg",
//         "createdAt": "2021-11-25T10:14:55.000Z",
//       },
//       {
//         "id": 16,
//         "UserId": 6,
//         "account": "user6",
//         "name": "User6",
//         "comment": "Non autem deleniti perspiciatis architecto.",
//         "avatar": "https://randomuser.me/api/portraits/men/6.jpg",
//         "createdAt": "2021-11-24T10:14:55.000Z",
//       },
//       {
//         "id": 19,
//         "UserId": 8,
//         "account": "user8",
//         "name": "User8",
//         "comment": "Laboriosam aut fugit eaque molestiae aspernatur velit fugit laudantium.",
//         "avatar": "https://randomuser.me/api/portraits/women/17.jpg",
//         "createdAt": "2021-11-23T10:14:55.000Z",
//       },
//       {
//         "id": 20,
//         "UserId": 10,
//         "account": "user10",
//         "name": "User10",
//         "comment": "fuga modi ipsa",
//         "avatar": "https://randomuser.me/api/portraits/women/6.jpg",
//         "createdAt": "2021-11-22T10:14:55.000Z",
//       },
//       {
//         "id": 36,
//         "UserId": 6,
//         "account": "user6",
//         "name": "User6",
//         "comment": "Non autem deleniti perspiciatis architecto.",
//         "avatar": "https://randomuser.me/api/portraits/men/3.jpg",
//         "createdAt": "2021-11-21T10:14:55.000Z",
//       },
//       {
//         "id": 39,
//         "UserId": 8,
//         "account": "user8",
//         "name": "User8",
//         "comment": "Laboriosam aut fugit eaque molestiae aspernatur velit fugit laudantium.",
//         "avatar": "https://randomuser.me/api/portraits/men/46.jpg",
//         "createdAt": "2021-11-18T10:14:55.000Z",
//       },
//       {
//         "id": 40,
//         "UserId": 10,
//         "account": "user10",
//         "name": "User10",
//         "comment": "fuga modi deleniti perspiciatis ipsa",
//         "avatar": "https://randomuser.me/api/portraits/women/44.jpg",
//         "createdAt": "2021-11-06T10:14:55.000Z",
//       },
//       {
//         "id": 45,
//         "UserId": 15,
//         "account": "user15",
//         "name": "User15",
//         "comment": "fugadeleniti perspiciatis modi ipsa",
//         "avatar": "https://randomuser.me/api/portraits/women/36.jpg",
//         "createdAt": "2021-11-05T10:14:55.000Z",
//       },
//       {
//         "id": 49,
//         "UserId": 152,
//         "account": "user152",
//         "name": "User152",
//         "comment": "fuga modi ipsa",
//         "avatar": "https://randomuser.me/api/portraits/men/16.jpg",
//         "createdAt": "2021-10-06T10:14:55.000Z",
//       }
//     ],
//     "Likes": [],
//     "replyCount": 7,
//     "likeCount": 18,
//     "isLike": true,
//   }
// }

export default {
  components: {
    PageNameBanner,
    TweetCard,
    ReplyList,
    PopularUsersCard,
    ReplyModel,
    Toast,
  },
  data() {
    return {
      bannerLinkBack: true,
      bannerTitle: '推文',
      tweet: {},
      showReplyModal: false,
      ToastMessage: {
        message: "",
        dataStatus: "",
      },
    }
  },
  created() {
    const tweetId = this.$route.params.id
    this.fetchTweetData(tweetId)
  },
  methods: {
    async fetchTweetData(tweetId) {
      try {
        const { data } = await tweetsAPI.getTweet({ tweetId })
        console.log(`tweet data`, data)
        // 缺少發文作者的 name, account, avatar
        const { id, UserId, account, name, avatar, description, createdAt, Replies, Likes, replyCount, likeCount, isLiked: isLike } = data
        this.tweet = { id, UserId, account, name, avatar, description, createdAt, Replies, Likes, replyCount, likeCount, isLike }
        this.tweet.Replies = this.tweet.Replies.map(reply => {
          const { id, UserId, User, comment, createdAt } = reply
          return { id, UserId, account: User.account, name: User.name, comment, avatar: User.avatar, createdAt }
        })
      } catch (error) {
        console.log(error)
        this.ToastMessage.message = `無法取得推文資料，請稍後再試`
        this.ToastMessage.dataStatus = 'error'
      }


      console.log(`fetch data of tweet-${tweetId}`)

    },
    afterShowReplyModal() {
      this.showReplyModal = true
    },
    afterCommentCheckout() {
      this.showReplyModal = false
    },
    async afterAddLike(tweetId){
      try {
        const {data} = await usersAPI.addLike({ tweetId })
        if (data.status !== 'success') {
            throw new Error(data.message)
          }
        this.tweet.isLike = true
      } catch(error) {
        console.log(error)
        this.ToastMessage.message = `無法取新增最愛，請稍後再試`
        this.ToastMessage.dataStatus = 'error'
      }
    },
    async afterDeleteLike (tweetId) {
      try {
        const {data} = await usersAPI.deleteLike({ tweetId })
          if (data.status !== 'success') {
            throw new Error(data.message)
          }
        this.tweet.isLike = false
      } catch (error) {
        console.log(error)
        this.ToastMessage.message = `無法移除最愛，請稍後再試`
        this.ToastMessage.dataStatus = 'error'
      }
    }
  }
};
</script>
