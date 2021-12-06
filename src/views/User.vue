<template>
  <div class="user-page">
    <section class="center-view">
      <page-name-banner :user="user" />
      <profile-card
        :initial-user="user"
        @after-toggle-notification="afterToggleNotification"
        @after-toggle-isFollowed="afterToggleIsFollowed"
        @show-setting-form="afterShowSettingForm"
      />
      <feeds-nav-pills />
      <user-feed-list
        :initial-user="user"
        :current-feeds="currentFeeds"
        :initial-feeds="feeds"
        @after-toggle-like="afterToggleLike"
        @after-show-reply-modal="afterShowReplyModal"
      />
      <profile-edit-modal
        v-show="showSettingForm"
        :initial-user="user"
        :is-processing="isProcessing"
        @close-setting-form="afterCloseSettingForm"
        @after-profile-form-submit="afterProfileFormSubmit"
      />
    </section>
    <section class="right-card">
      <popular-users-card />
    </section>
    <reply-modal
      v-show="replyModal.isShow"
      :reply-tweet="replyModal.replyTweet"
      @after-comment-checkout="afterCommentCheckout"
    />
    <Toast :ToastMessage="ToastMessage" />
  </div>
</template>

<script>
import PageNameBanner from "../components/PageNameBanner.vue"
import ProfileCard from "../components/ProfileCard.vue"
import FeedsNavPills from "../components/FeedsNavPills.vue"
import UserFeedList from "../components/UserFeedList.vue"
import ProfileEditModal from "../components/ProfileEditModal.vue"
import PopularUsersCard from "../components/PopularUsersCard.vue"
import ReplyModal from "../components/ReplyModel.vue"
import Toast from "../components/AlertToast.vue"
import { mapState } from "vuex"
import usersAPI from '../api/users.js'

export default {
  name: "user",
  components: {
    PageNameBanner,
    ProfileCard,
    FeedsNavPills,
    UserFeedList,
    ProfileEditModal,
    PopularUsersCard,
    ReplyModal,
    Toast,
  },
  data() {
    return {
      user: {},
      currentFeeds: "tweets",
      feeds: [],
      showSettingForm: false,
      replyModal: {
        isShow: false,
        replyTweet: {},
      },
      ToastMessage: {
        message: "",
        dataStatus: "",
      },
      isProcessing: false
    }
  },
  beforeRouteUpdate(to, from, next) {
    const feedsType = to.query.feeds ? to.query.feeds : "tweets"
    this.currentFeeds = feedsType
    this.fetchFeedsData(feedsType)
    next()
  },
  methods: {
    async fetchUserData(userId) {
      try {
        const { data } = await usersAPI.getUser({ userId })
        // console.log('使用者資料',data)
        if (data.name.length === 0) {
          throw new Error('無法取得使用者資料')
        }

        const {
          id,
          account,
          name,
          avatar,
          cover,
          introduction,
          role,
          FollowerCount: followerCount,
          FollowingCount: followingCount,
          TweetCount: tweetsCount,
          isCurrentUser,
          isFollowed,
          isNoticed,
        } = data

        this.user = {
          id,
          account,
          name,
          avatar,
          cover,
          introduction,
          tweetsCount,
          role,
          followerCount,
          followingCount,
          isCurrentUser,
          isFollowed,
          isNoticed,
        }

      } catch (error) {
        console.log(error)
        this.ToastMessage.message = `無法取得使用者資料，請稍後再試`
        this.ToastMessage.dataStatus = 'error'
      }
    },
    async fetchFeedsData(feedsType) {
      const userId = this.$route.params.id
      // 取得使用者推文紀錄
      if (feedsType === "tweets") {
        try {
          const { data } = await usersAPI.getUserTweets({ userId })
          // console.log(`tweets list of user-${userId}`, data)
          this.feeds = data
        } catch (error) {
          console.log(error)
          this.ToastMessage.message = `無法取得推文資料，請稍後再試`
          this.ToastMessage.dataStatus = 'error'
        }
        // 取得使用者回文紀錄
      } else if (feedsType === "reply") {
        try {
          const { data } = await usersAPI.getUserReply({ userId })
          // console.log(`replies of user-${userId}`, data)
          this.feeds = data.map(reply => {
            const { TweetId, User, comment: description, createdAt } = reply
            return {
              TweetId, User, description, createdAt
            }
          })
        } catch (error) {
          console.log(error)
          this.ToastMessage.message = `無法取得推文與回覆資料，請稍後再試`
          this.ToastMessage.dataStatus = 'error'
        }
      } else if (feedsType === "like") {
        try {
          const { data } = await usersAPI.getUserLike({ userId })
          console.log(`Like tweets of user-${userId}`, data)
          this.feeds = data.map(likeFeed => {
            const { TweetId, User, Tweet, createdAt } = likeFeed
            return {
              TweetId,
              User,
              createdAt,
              description: Tweet.description,
              isLiked: Tweet.isLiked,
              ReplyCount: Tweet.ReplyCount,
              LikeCount: Tweet.LikeCount
            }
          })
        } catch (error) {
          console.log(error)
          this.ToastMessage.message = `無法取得喜愛的內容，請稍後再試`
          this.ToastMessage.dataStatus = 'error'
        }
      }
    },
    afterToggleNotification(status) {
      // if (this.user.toggleIsFollowed) {
      //   API put 讓 toggleIsFollowed = true
      // } else {
      //   API put 讓 toggleIsFollowed = false
      // }
      console.log(`Notification: ${status}`)
    },
    afterToggleIsFollowed(status) {

      // if (this.user.toggleIsFollowed) {
      //   API put 讓 toggleIsFollowed = true
      // } else {
      //   API put 讓 toggleIsFollowed = false
      // }
      console.log(`Toggle isFollowed status to ${status}`)
    },
    async afterToggleLike({ feedId, status }) {
      try {
        if (status) {
          // put isLike via API-addLike
          const {data} = await usersAPI.addLike({ tweetId: feedId })
          if (data.status !== 'success') {
            throw new Error(data.message)
          }
        } else {
          // delete isLike via API-deleteLike
          const {data} = await usersAPI.deleteLike({ tweetId: feedId })
          if (data.status !== 'success') {
            throw new Error(data.message)
          }
        }
        // toggle the like-icon 
        this.feeds = this.feeds.map(feed => {
        if (feed.TweetId === feedId) {
          return {
            ...feed,
            isLiked: status,
          }
        } else {
          return feed
        }
      })
      } catch (error) {
        console.log(error)
        this.ToastMessage.message = `無法更新最愛，請稍後再試`
        this.ToastMessage.dataStatus = 'error'
      }
      
    },
    afterShowSettingForm() {
      this.showSettingForm = true
    },
    afterCloseSettingForm() {
      this.showSettingForm = false
    },
    afterProfileFormSubmit(data) {
      this.isProcessing = true
      console.log("submit profile form", data)
      // TODO : 串接 API
      this.showSettingForm = false
      this.isProcessing = false
    },
    afterShowReplyModal(tweetId) {
      this.replyModal.isShow = true
      this.replyModal.replyTweet = this.feeds.find(
        (tweet) => tweet.id === tweetId
      )
    },
    afterCommentCheckout() {
      this.replyModal.isShow = false
      this.replyModal.replyTweet = {}
    },
  },
  created() {
    const { id: userId } = this.$route.params
    const feedsType = this.$route.query.feeds
    this.fetchUserData(userId)
    this.currentFeeds = feedsType ? feedsType : "tweets"
    this.fetchFeedsData(this.currentFeeds)
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>
