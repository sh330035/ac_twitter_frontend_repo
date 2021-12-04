<template>
  <div class="tweet-card">
    <div class="tweet-card__author">
      <img class="tweet-card__author__avatar" :src="tweet.avatar" alt="Avatar" />
      <div class="tweet-card__author__detail">
        <div class="tweet-card__author__detail__name"> {{ tweet.name }} </div>
        <div class="tweet-card__author__detail__account">{{ tweet.account | accountTag }}</div>
      </div>
    </div>
    <div class="tweet-card__post-content">
      {{ tweet.description }}
    </div>
    <div class="tweet-card__create-time">{{ tweet.createdAt | timeFormat }} </div>
    <div class="tweet-card__social-count">
      <div class="tweet-card__social-count__reply">
        <span class="tweet-card__social-count__reply__count">{{ tweet.replyCount}}</span>
        回覆
      </div>
      <div class="tweet-card__social-count__like">
        <span class="tweet-card__social-count__like__count">{{ tweet.likeCount }}</span>
        喜歡次數
      </div>
    </div>
    <div class="tweet-card__social-action-bar">
      <span class="tweet-card__social-action-bar__reply-icon"></span>
      <span v-if="tweet.isLike" @click="removeLike(tweet.id)" class="tweet-card__social-action-bar__red-like-icon"></span>
      <span v-else @click="addLike(tweet.id)" class="tweet-card__social-action-bar__like-icon"></span>
      
    </div>
  </div>
</template>

<script>
import { timeFormatFilter, accountFilter } from '../utils/mixins.js'

export default {
  props: {
    initialTweet: {
      type: Object,
      required: true,
    }
  },
  mixins: [timeFormatFilter, accountFilter],
  data() {
    return {
      tweet: {
        id: -1,
        UserId: -1,
        account: "",
        name: "",
        avatar: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        Replies: [],
        replyCount: 0,
        likeCount: 0,
        isLike: false,
      }
    }
  },
  created () {
    this.updateTweetData()
  },
  methods: {
    updateTweetData() {
      const { id, UserId: userId,account, name, avatar, description, createdAt, replyCount, likeCount, isLike } = this.initialTweet

      this.tweet = {
        ...this.tweet,
        id, userId,account, name, avatar, description, createdAt, replyCount, likeCount, isLike,
      }
    },
    addLike (tweetId) {
      // API - TODO
      console.log(`add like tweet-${tweetId} via API`)
      this.tweet.isLike = true
    },
    removeLike (tweetId) {
      // API - TODO
      console.log(`remove like tweet-${tweetId} via API`)
      this.tweet.isLike = false
    }
  }
}
</script>


