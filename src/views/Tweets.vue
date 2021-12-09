<template>
  <div class="tweets-page">
    <section class="center-view">
      <ReplyModal
        v-if="isReplyModalShow"
        @after-comment-checkout="afterCommentCheckout"
        @after-reply-submit="afterReplySubmit"
        :replyTweet="replyTweet"
      />
      <PageNameBanner :banner-title="bannerTitle" />
      <NewTweetForm @after-submit-tweet-form="afterSumbitTweetForm"  />
      <ScaleLoader :is-loading="isLoading"/>
      <NewestFeedList
        v-for="tweet in tweets"
        :key="tweet.id"
        :tweet="tweet"
        @after-add-like="addLikeHandler"
        @after-delete-like="deleteLikeHandler"
        @after-launch-reply-modal="afterLaunchReplyModal"
      />
    </section>
    <section class="right-card">
      <PopularUsersCard />
    </section>
    <Toast :ToastMessage="ToastMessage" />
  </div>
</template>

<script>
import PopularUsersCard from "../components/PopularUsersCard.vue";
import PageNameBanner from "../components/PageNameBanner.vue";
import NewTweetForm from "../components/NewTweetForm.vue";
import NewestFeedList from "../components/NewestFeedList.vue";
import ReplyModal from "../components/ReplyModel.vue";
import newestTweetsAPI from "../api/tweets";
import likeTweetsAPI from "../api/users";
import Toast from "../components/AlertToast.vue";
import ScaleLoader from "../components/ScaleLoader.vue"
import { mapState } from "vuex";

export default {
  name: "Tweets",
  components: {
    PopularUsersCard,
    PageNameBanner,
    NewTweetForm,
    NewestFeedList,
    ReplyModal,
    Toast,
    ScaleLoader,
  },
  data() {
    return {
      bannerTitle: "首頁",
      tweets: [],
      // reply modal
      isReplyModalShow: false,
      replyTweet: {},
      ToastMessage: {
        message: "",
        dataStatus: "",
      },
      isLoading: true,
    };
  },
  created() {
    this.isLoading = true
    this.fetchTweetsData();
    // 首頁自動刷新功能 (每30秒)
    setInterval(() => {
      this.fetchTweetsData();
    }, 30000);
  },
  computed: {
    ...mapState(["isRenderTweet"]),
  },
  watch: {
    isRenderTweet: {
      handler: function () {
        this.fetchTweetsData();
      },
      deep: true,
    },
  },
  methods: {
    async fetchTweetsData() {
      try {
        const { data } = await newestTweetsAPI.getNewestTweets();
        this.tweets = data;
        this.isLoading = false
      } catch (error) {
        console.log(error);
        this.isLoading = false
      }
    },
    async addLikeHandler(tweetId) {
      try {
        const { data } = await likeTweetsAPI.addLike({ tweetId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id !== tweetId) {
            return tweet;
          } else {
            return {
              ...tweet,
              likeCount: tweet.likeCount + 1,
              isLiked: true,
            };
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteLikeHandler(tweetId) {
      try {
        const { data } = await likeTweetsAPI.deleteLike({ tweetId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id !== tweetId) {
            return tweet;
          } else {
            return {
              ...tweet,
              likeCount: tweet.likeCount - 1,
              isLiked: false,
            };
          }
        });
      } catch (error) {
        console.log("error", error);
        this.ToastMessage.message = `無法取消讚，請稍後再試`;
        this.ToastMessage.dataStatus = "";
        this.ToastMessage.dataStatus = "error";
      }
    },
    // reply Modal 控制區
    afterLaunchReplyModal(tweetId) {
      const replyTweet = this.tweets.find((tweet) => tweet.id == tweetId);
      const { User, createdAt, description } = replyTweet;
      this.replyTweet = {
        id: tweetId,
        name: User.name,
        account: User.account,
        createdAt,
        avatar: User.avatar,
        description,
      };
      this.isReplyModalShow = true;
    },
    afterReplySubmit(tweetId) {
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id !== tweetId) {
          return tweet;
        } else {
          return {
            ...tweet,
            replyCount: tweet.replyCount + 1,
          };
        }
      });
    },
    afterCommentCheckout() {
      this.isReplyModalShow = false;
    },
    // 發文後刷新畫面
    afterSumbitTweetForm() {
      this.fetchTweetsData();
    },
  },
};
</script>
