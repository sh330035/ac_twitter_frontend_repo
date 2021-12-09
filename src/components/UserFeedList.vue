<template>
  <div class="user-feed-list">
    <!-- v-for Start -->
    <router-link
      :to="{ name: 'tweet-replies', params: { id: feed.TweetId } }"
      v-for="feed in feeds"
      :key="feed.keyId"
      class="feed"
    >
      <router-link
        :to="{ name: 'user', params: { id: feed.LinkAccountId } }"
        class="feed__avatar"
      >
        <img :src="feed.Avatar" class="feed__avatar__img" alt="Avatar" />
      </router-link>
      <div class="feed__detail">
        <div class="feed__detail__author">
          <router-link
            :to="{ name: 'user', params: { id: feed.LinkAccountId } }"
            class="feed__detail__author__name"
          >
            {{ feed.Name }}
          </router-link>
          <span class="feed__detail__author__account">
            {{ feed.Account | accountTag }}
          </span>
          <span class="feed__detail__author__post-time">
            ・{{ feed.createdAt | fromNow }}
          </span>
        </div>
        <div v-if="currentFeeds === 'reply'" class="feed__detail__reply-to">
          回覆
          <router-link
            :to="{ name: 'user', params: { id: feed.User.id } }"
            class="feed__detail__reply-to__account"
            >{{ feed.TweetAccount | accountTag }}</router-link
          >
        </div>
        <div class="feed__detail__comment">{{ feed.description }}</div>
        <div v-if="currentFeeds !== 'reply'" class="feed__detail__social-count">
          <div class="feed__detail__social-count__reply-count">
            <span @click.prevent="showReplyModal(feed.TweetId)" class="feed__detail__social-count__reply-count__icon"></span
            >{{ feed.ReplyCount }}
          </div>
          <div class="feed__detail__social-count__like-count" :class="{active: feed.isLiked}">
            <span
              v-if="!feed.isLiked"
              @click.prevent="toggleLike(feed.TweetId, true)"
              class="feed__detail__social-count__like-count__icon"
            ></span
            ><span
              v-if="feed.isLiked"
              @click.prevent="toggleLike(feed.TweetId, false)"
              class="feed__detail__social-count__like-count__icon-red"
            ></span>
            {{ feed.LikeCount }}
          </div>
        </div>
      </div>
    </router-link>
    <!-- v-for End -->
  </div>
</template>

<script>
import { accountFilter, fromNowFilter } from '../utils/mixins.js'

export default {
  props: {
    initialUser: {
      type: Object,
      required: true
    },
    currentFeeds: {
      type: String,
      default: 'tweets'
    },
    initialFeeds: {
      type: Array,
      required: true
    }
  },
  mixins: [accountFilter, fromNowFilter],
  data() {
    return {
      user: {},
      feeds: []
    }
  },
  created() {
    this.updateFeedsData()
  },
  watch: {
    currentFeeds: function () {
      this.updateFeedsData()
    },
    initialFeeds: function () {
      this.updateFeedsData()
    }
  },
  methods: {
    updateFeedsData() {
      this.feeds = this.initialFeeds
    },
    toggleLike(feedId, status) {
      this.$emit('after-toggle-like', { feedId, status })
    },
    showReplyModal(feedId) {
      this.$emit('after-show-reply-modal', feedId)
    }
  },
}
</script>