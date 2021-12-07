<template>
  <div class="tweets-page">
    <section class="center-view">
      <ReplyModal
        v-if="isReplyModalShow"
        @after-comment-checkout="afterCommentCheckout"
        :replyTweet="replyTweet"
      />
      <PageNameBanner :banner-title="bannerTitle" />
      <NewTweetForm @after-submit-tweet-form="afterSumbitTweetForm" />
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

export default {
  name: "Tweets",
  components: {
    PopularUsersCard,
    PageNameBanner,
    NewTweetForm,
    NewestFeedList,
    ReplyModal,
  },
  data() {
    return {
      bannerTitle: "首頁",
      tweets: [],
      // reply modal
      isReplyModalShow: false,
      replyTweet: {},
    };
  },
  created() {
    this.fetchTweetsData();
  },
  methods: {
    async fetchTweetsData() {
      try {
        const { data } = await newestTweetsAPI.getNewestTweets();

        this.tweets = data;
      } catch (error) {
        console.log(error);
      }
    },
    async addLikeHandler(tweetId) {
      try {
        const { data } = await likeTweetsAPI.addLike({ tweetId });

        console.log(data.message);

        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id !== tweetId) {
            return tweet;
          } else {
            return {
              ...tweet,
              likeCount: tweet.likeCount + 1,
              isLike: true,
            };
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    deleteLikeHandler(tweetId) {
      console.log("emit", tweetId);
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id !== tweetId) {
          return tweet;
        } else {
          return {
            ...tweet,
            likeCount: tweet.likeCount - 1,
            isLike: false,
          };
        }
      });
    },
    // reply Modal 控制區
    afterLaunchReplyModal(tweetId) {
      const replyTweet =  this.tweets.find((tweet) => tweet.id == tweetId);
      const { User, createdAt, description } = replyTweet
      this.replyTweet = { id: tweetId, name: User.name, account: User.account, createdAt, avatar: User.avatar, description } 
      this.isReplyModalShow = true;
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
