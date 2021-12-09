<template>
  <div class="user-page">
    <section class="center-view">
      <page-name-banner :user="user" />
      <ScaleLoader :is-loading="isLoading"/>
      <profile-card
        v-show="!isLoading"
        :initial-user="user"
        @after-toggle-notification="afterToggleNotification"
        @after-toggle-isFollowed="afterToggleIsFollowed"
        @show-setting-form="afterShowSettingForm"
      />
      <feeds-nav-pills v-show="!isLoading" />
      <user-feed-list
        v-show="!isLoading"
        :initial-user="user"
        :current-feeds="currentFeeds"
        :initial-feeds="feeds"
        @after-toggle-like="afterToggleLike"
        @after-show-reply-modal="afterShowReplyModal"
      />
      <profile-edit-modal
        v-if="showSettingForm"
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
      v-if="replyModal.isShow"
      :reply-tweet="replyModal.replyTweet"
      @after-comment-checkout="afterCommentCheckout"
      @after-reply-submit="afterReplySubmit"
    />
    <Toast :ToastMessage="ToastMessage" />
  </div>
</template>

<script>
import PageNameBanner from "../components/PageNameBanner.vue";
import ProfileCard from "../components/ProfileCard.vue";
import FeedsNavPills from "../components/FeedsNavPills.vue";
import UserFeedList from "../components/UserFeedList.vue";
import ProfileEditModal from "../components/ProfileEditModal.vue";
import PopularUsersCard from "../components/PopularUsersCard.vue";
import ReplyModal from "../components/ReplyModel.vue";
import Toast from "../components/AlertToast.vue";
import ScaleLoader from "../components/ScaleLoader.vue"
import { mapState } from "vuex";
import usersAPI from "../api/users.js";

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
    ScaleLoader,
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
      isProcessing: false,
      isLoading: true,
    };
  },
  beforeRouteUpdate(to, from, next) {
    const userId = to.params.id;
    const feedsType = to.query.feeds ? to.query.feeds : "tweets";
    this.currentFeeds = feedsType;
    this.fetchUserData(userId);
    this.fetchFeedsData(userId, feedsType);
    next();
  },
  watch: {
    isRender: {
      handler: function () {
        this.fetchUserData(this.user.id);
      },
      deep: true,
    },
    isRenderTweet: {
      handler: function () {
        // 只有在自己的個人資料的推文頁面時，會刷新 feeds data
        if (this.user.id == this.currentUser.id && !this.$route.query.feeds) {
          this.fetchFeedsData(this.user.id, "tweets");
        }
      },
      deep: true,
    },
  },
  methods: {
    async fetchUserData(userId) {
      try {
        const { data } = await usersAPI.getUser({ userId });
        if (data.name.length === 0) {
          throw new Error("無法取得使用者資料");
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
        } = data;

        this.user = {
          id,
          account,
          name,
          avatar,
          cover,
          introduction: introduction ? introduction : "",
          tweetsCount,
          role,
          followerCount,
          followingCount,
          isCurrentUser,
          isFollowed,
          isNoticed,
        };
      } catch (error) {
        console.log(error);
        this.ToastMessage.message = `無法取得使用者資料，請稍後再試`;
        this.ToastMessage.dataStatus = "";
        this.ToastMessage.dataStatus = "error";
      }
    },
    async fetchFeedsData(userId, feedsType) {
      // 取得使用者推文紀錄
      if (feedsType === "tweets") {
        try {
          const { data } = await usersAPI.getUserTweets({ userId });
          // console.log(`tweets list of user-${userId}`, data)

          this.feeds = data.map((feed) => {
            const {
              TweetId,
              User,
              description,
              createdAt,
              isLiked,
              ReplyCount,
              LikeCount,
            } = feed;
            return {
              keyId: TweetId,
              TweetId,
              User,
              description,
              createdAt,
              isLiked,
              ReplyCount,
              LikeCount,
              Avatar: User.avatar,
              Name: User.name,
              Account: User.account,
              LinkAccountId: User.id,
            };
          });
          this.isLoading= false
        } catch (error) {
          console.log(error);
          this.ToastMessage.message = `無法取得推文資料，請稍後再試`;
          this.ToastMessage.dataStatus = "";
          this.ToastMessage.dataStatus = "error";
          this.isLoading= false
        }
        // 取得使用者回文紀錄
      } else if (feedsType === "reply") {
        try {
          const { data } = await usersAPI.getUserReply({ userId });
          // console.log(`Reply tweets of user-${userId}`, data)
          this.feeds = data.map((reply) => {
            const {
              id,
              TweetId,
              Tweet,
              User,
              comment: description,
              createdAt,
            } = reply;
            return {
              keyId: id,
              TweetAccount: Tweet.User.account,
              TweetId,
              User,
              description,
              createdAt,
              Avatar: User.avatar,
              Name: User.name,
              Account: User.account,
              LinkAccountId: User.id,
            };
          });
        } catch (error) {
          console.log(error);
          this.ToastMessage.dataStatus = "";
          this.ToastMessage.message = `無法取得推文與回覆資料，請稍後再試`;
          this.ToastMessage.dataStatus = "error";
        }
      } else if (feedsType === "like") {
        try {
          const { data } = await usersAPI.getUserLike({ userId });
          // console.log(`Like tweets of user-${userId}`, data)
          this.feeds = data.map((likeFeed) => {
            const { TweetId, User, Tweet, createdAt, LikeId } = likeFeed;
            return {
              keyId: LikeId,
              TweetId,
              User,
              createdAt,
              description: Tweet.description,
              isLiked: Tweet.isLiked,
              ReplyCount: Tweet.ReplyCount,
              LikeCount: Tweet.LikeCount,
              Avatar: Tweet.User.avatar,
              Name: Tweet.User.name,
              Account: Tweet.User.account,
              LinkAccountId: Tweet.User.id,
            };
          });
        } catch (error) {
          console.log(error);
          this.ToastMessage.dataStatus = "";
          this.ToastMessage.message = `無法取得喜愛的內容，請稍後再試`;
          this.ToastMessage.dataStatus = "error";
        }
      }
    },
    // Notice button
    async afterToggleNotification(status) {
      try {
        if (this.currentUser.id == this.user.id) {
          throw new Error("無法自己關注自己");
        }
        if (status == "on") {
          const id = { id: this.user.id };
          const { data } = await usersAPI.addNotice({ id });

          if (data.status !== "success") {
            throw new Error(data.message);
          }
        } else {
          const id = this.user.id;
          const { data } = await usersAPI.deleteNotice({ userId: id });

          if (data.status !== "success") {
            throw new Error(data.message);
          }
        }
      } catch (error) {
        console.log(error);
        this.ToastMessage.dataStatus = "";
        this.ToastMessage.message = `無法更新追蹤狀態，請稍後再試`;
        this.ToastMessage.dataStatus = "error";
      }
    },
    async afterToggleIsFollowed(status) {
      try {
        if (this.currentUser.id == this.user.id) {
          throw new Error("無法自己追蹤自己");
        }
        if (status) {
          const id = { id: this.user.id };
          const { data } = await usersAPI.addFollowing({ id });

          if (data.status !== "success") {
            throw new Error(data.message);
          }
        } else {
          const id = this.user.id;
          const { data } = await usersAPI.deleteFollowing({ userId: id });

          if (data.status !== "success") {
            throw new Error(data.message);
          }
        }
        // 修改 vuex 狀態
        this.$store.commit("render");
      } catch (error) {
        console.log(error);
        this.ToastMessage.dataStatus = "";
        this.ToastMessage.message = `無法更新追蹤狀態，請稍後再試`;
        this.ToastMessage.dataStatus = "error";
      }
    },
    async afterToggleLike({ feedId, status }) {
      try {
        if (status) {
          // put isLike via API-addLike
          const { data } = await usersAPI.addLike({ tweetId: feedId });
          if (data.status !== "success") {
            throw new Error(data.message);
          }
        } else {
          // delete isLike via API-deleteLike
          const { data } = await usersAPI.deleteLike({ tweetId: feedId });
          if (data.status !== "success") {
            throw new Error(data.message);
          }
        }
        // toggle the like-icon
        this.feeds = this.feeds.map((feed) => {
          if (feed.TweetId === feedId) {
            return {
              ...feed,
              isLiked: status,
              LikeCount: status ? feed.LikeCount + 1 : feed.LikeCount - 1,
            };
          } else {
            return feed;
          }
        });
      } catch (error) {
        console.log(error);
        this.ToastMessage.dataStatus = "";
        this.ToastMessage.message = `無法更新最愛，請稍後再試`;
        this.ToastMessage.dataStatus = "error";
      }
    },
    afterShowSettingForm() {
      this.showSettingForm = true;
    },
    afterCloseSettingForm() {
      this.showSettingForm = false;
    },
    async afterProfileFormSubmit(formData) {
      try {
        const userId = this.user.id;
        this.isProcessing = true;
        const { data } = await usersAPI.updateUserProfile({ userId, formData });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.ToastMessage.dataStatus = "";
        this.ToastMessage.message = "個人資料已成功更新";
        this.ToastMessage.dataStatus = "success";
        this.showSettingForm = false;
        this.isProcessing = false;
        this.fetchUserData(userId);
      } catch (error) {
        console.log("error", error);
        this.ToastMessage.dataStatus = "";
        this.ToastMessage.message = `無法更新個人資料，請稍後再試`;
        this.ToastMessage.dataStatus = "error";
        this.isProcessing = false;
      }
    },
    afterShowReplyModal(tweetId) {
      this.replyModal.isShow = true;
      const replyTweet = this.feeds.find((tweet) => tweet.TweetId === tweetId);
      const { User, createdAt, description } = replyTweet;
      this.replyModal.replyTweet = {
        id: tweetId,
        name: User.name,
        account: User.account,
        createdAt,
        avatar: User.avatar,
        description,
      };
    },
    afterReplySubmit(tweetId) {
      this.feeds = this.feeds.map((tweet) => {
        if (tweet.TweetId !== tweetId) {
          return tweet;
        } else {
          return {
            ...tweet,
            ReplyCount: tweet.ReplyCount + 1,
          };
        }
      });
    },
    afterCommentCheckout() {
      this.replyModal.isShow = false;
      this.replyModal.replyTweet = {};
    },
  },
  created() {
    this.isLoading = true
    const { id: userId } = this.$route.params;
    const feedsType = this.$route.query.feeds;
    this.fetchUserData(userId);
    this.currentFeeds = feedsType ? feedsType : "tweets";
    this.fetchFeedsData(userId, this.currentFeeds);
  },
  computed: {
    ...mapState(["currentUser", "isRender", "isRenderTweet"]),
  },
};
</script>
