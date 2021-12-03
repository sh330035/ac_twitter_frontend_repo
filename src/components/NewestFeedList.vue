<template>
  <div class="newest">
    <div class="newest__tweet d-flex">
      <!-- 目前 tweets 中，沒有該 tweet 之發文者資料，圖片先帶假資料 -->
      <span
        ><a href="">
          <img
            src="https://randomuser.me/api/portraits/women/81.jpg"
            alt=""
            class="newest__tweet__image"
        /></a>
      </span>
      <div class="newest__tweet__container d-flex-col">
        <div class="newest__tweet__user">
          <h2 class="newest__tweet__user__name">apple</h2>
          <span class="newest__tweet__user__account"
            >@apple・{{ tweet.createdAt }} 小時</span
          >
        </div>
        <div class="newest__tweet__descriptoion">
          <p>L{{ tweet.description }}</p>
        </div>
        <div class="newest__tweet__icon d-flex">
          <div class="newest__tweet__icon__reply d-flex">
            <img
              src="../assets/images/reply.svg"
              alt=""
              class="icon newest__tweet__icon__image icon__reply__image"
            />
            <span class="newest__tweet__icon__count">{{
              tweet.replyCount
            }}</span>
          </div>
          <div class="newest__tweet__icon__like d-flex">
            <img
              v-if="tweet.isLike"
              @click.prevent.stop="deleteLike(tweet.id)"
              src="../assets/images/like-red.svg"
              alt=""
              class="icon newest__tweet__icon__image icon__like__image"
            />
            <img
              v-else
              @click.prevent.stop="addLike(tweet.id)"
              src="../assets/images/like.svg"
              alt=""
              class="icon newest__tweet__icon__image icon__like__image"
            />
            <span
              class="newest__tweet__icon__count"
              :class="{ red: tweet.isLike }"
              >{{ tweet.likeCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Newest-tweets",
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addLike(tweetId) {
      console.log("add", tweetId);
      this.$emit("after-add-like", tweetId);
    },
    deleteLike(tweetId) {
      console.log("delete", tweetId);
      this.$emit("after-delete-like", tweetId);
    },
  },
};
</script>