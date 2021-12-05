<template>
  <div class="user-feed-list">
    <!-- v-for Start -->
    <router-link
      :to="{ name: 'tweet-replies', params: { id: feed.id } }"
      v-for="feed in feeds"
      :key="feed.id"
      class="feed"
    >
      <router-link
        :to="{ name: 'user', params: { id: feed.UserId } }"
        class="feed__avatar"
      >
        <img :src="feed.avatar" class="feed__avatar__img" alt="Avatar" />
      </router-link>
      <div class="feed__detail">
        <div class="feed__detail__author">
          <router-link
            :to="{ name: 'user', params: { id: feed.UserId } }"
            class="feed__detail__author__name"
          >
            {{ feed.name }}
          </router-link>
          <span class="feed__detail__author__account">
            {{ feed.name | accountTag }}
          </span>
          <span class="feed__detail__author__post-time">
            ・{{ feed.createdAt | fromNow }}
          </span>
        </div>
        <div v-if="currentFeeds === 'reply'" class="feed__detail__reply-to">
          回覆
          <router-link
            :to="{ name: 'user', params: { id: feed.UserId } }"
            class="feed__detail__reply-to__account"
            >{{ feed.name | accountTag }}</router-link
          >
        </div>
        <div class="feed__detail__comment">{{ feed.comment }}</div>
        <div v-if="currentFeeds !== 'reply'" class="feed__detail__social-count">
          <div class="feed__detail__social-count__reply-count">
            <span class="feed__detail__social-count__reply-count__icon"></span
            >{{ feed.replyCount }}
          </div>
          <div class="feed__detail__social-count__like-count">
            <span
              v-if="!feed.isLike"
              @click.prevent="toggleLike(feed.id, true)"
              class="feed__detail__social-count__like-count__icon"
            ></span
            ><span
              v-if="feed.isLike"
              @click.prevent="toggleLike(feed.id, false)"
              class="feed__detail__social-count__like-count__icon-red"
            ></span>
            {{ feed.likeCount }}
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
    }
  },
  methods: {
    updateFeedsData() {
      console.log('updating')
      console.log(`current feeds type is ${this.currentFeeds}`)
      this.feeds = this.initialFeeds
    },
    toggleLike(feedId, status) {

      this.$emit('after-toggle-like', { feedId, status })

      this.feeds = this.feeds.map(feed => {
        if (feed.id === feedId) {
          return {
            ...feed,
            isLike: status,
          }
        } else {
          return feed
        }
      })
    }
  },
}
</script>