<template>
  <div class="tweet-card">
    <div class="tweet-card__author">
      <router-link :to="{name: 'user', params: {id: tweet.userId}}"  >
        <img class="tweet-card__author__avatar" :src="tweet.avatar" alt="Avatar" />
      </router-link>
      <div class="tweet-card__author__detail">
        <router-link :to="{name: 'user', params: {id: tweet.userId}}" class="tweet-card__author__detail__name"> {{ tweet.name }} </router-link>
        <router-link :to="{name: 'user', params: {id: tweet.userId}}" class="tweet-card__author__detail__account">{{ tweet.account | accountTag }}</router-link>
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
      <span @click="showReplyModal" class="tweet-card__social-action-bar__reply-icon"></span>
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
        userId: -1,
        account: "",
        name: "",
        avatar: '',
        description: '',
        createdAt: '',
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
  watch: {
    initialTweet: {
      handler: function () {
        this.updateTweetData()
      },
      deep: true,
    }
  },
  methods: {
    updateTweetData() {
      const { id, UserId: userId,account, name, avatar, description, createdAt, replyCount, likeCount, isLike } = this.initialTweet

      this.tweet = {
        ...this.tweet,
        id, userId,account, name, avatar, description, createdAt, replyCount, likeCount, isLike,
      }
    },
    showReplyModal () {
      this.$emit('after-show-reply-modal')
    },
    addLike (tweetId) {
      this.$emit('after-add-like', tweetId)
    },
    removeLike (tweetId) {
      // API - TODO
      this.$emit('after-delete-like', tweetId)
      this.tweet.isLike = false
    }
  }
}
</script>


