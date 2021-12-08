<template>
  <div>
    <!-- v-for Start -->
    <div v-for="tweet in tweets" :key="tweet.id" class="admin-tweets__tweet">
      <div class="admin-tweets__tweet__content-wrapper">
        <img
          :src="tweet.User.avatar"
          class="admin-tweets__tweet__content-wrapper__avatar"
          alt="Avatar"
        />
        <div class="admin-tweets__tweet__content-wrapper__detail">
          <div class="admin-tweets__tweet__content-wrapper__detail__info">
            <span
              class="admin-tweets__tweet__content-wrapper__detail__info__name"
            >
              {{ tweet.User.name }}
            </span>
            <span
              class="
                admin-tweets__tweet__content-wrapper__detail__info__account
              "
            >
              {{ tweet.User.account | accountTag }}
            </span>
            <span
              class="
                admin-tweets__tweet__content-wrapper__detail__info__post-time
              "
            >
              ・{{ tweet.createdAt | fromNow }}
            </span>
          </div>
          <div class="admin-tweets__tweet__content-wrapper__detail__text">
            {{ tweet.description | ellipsis }}
          </div>
        </div>
      </div>
      <div
        @click="handleTweetDelete(tweet.id)"
        class="admin-tweets__tweet__delete"
      ></div>
    </div>
    <!-- V-for End -->
  </div>
</template>

<script>
import { fromNowFilter, accountFilter } from "../../utils/mixins.js";

export default {
  props: {
    initialTweets: {
      type: Array,
      required: true,
    },
  },
  mixins: [fromNowFilter, accountFilter],
  data() {
    return {
      tweets: [],
    };
  },
  filters: {
    ellipsis(value) {
      const len = 50;
      if (!value) return "";
      if (value.length > len) {
        return value.slice(0, len) + "...";
      }
      return value;
    },
  },
  created() {
    this.updateTweetsData();
  },
  watch: {
    initialTweets: function () {
      this.updateTweetsData();
    },
  },
  methods: {
    updateTweetsData() {
      this.tweets = this.initialTweets;
    },
    handleTweetDelete(tweetId) {
      console.log(tweetId);
      this.$emit("after-tweet-delete", { tweetId });
      this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
    },
  },
};
</script>


