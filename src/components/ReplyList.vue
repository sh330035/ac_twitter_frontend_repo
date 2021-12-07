<template>
  <div class="reply-list">
    <!-- v-for Start -->
    <div v-for="reply in tweet.Replies" :key="reply.id" class="reply">
      <router-link :to="{name: 'user', params: {id: reply.UserId}}" class="reply__avatar">
        <img :src="reply.avatar" class="reply__avatar__img" alt="Avatar" />
      </router-link>
      <div class="reply__detail">
        <div class="reply__detail__author">
          <router-link :to="{name: 'user', params: {id: reply.UserId}}" class="reply__detail__author__name">
            {{ reply.name }}
          </router-link>
          <span class="reply__detail__author__account">
            {{ reply.name | accountTag }}
          </span>
          <span class="reply__detail__author__post-time">
            ・{{ reply.createdAt | fromNow }}
          </span>
        </div>
        <div class="reply__detail__reply-to">
          回覆
          <router-link :to="{name: 'user', params: {id: tweet.UserId}}" class="reply__detail__reply-to__account">{{ tweet.name | accountTag }}</router-link >
        </div>
        <div class="reply__detail__comment">{{ reply.comment }}</div>
      </div>
    </div>
    <!-- V-for End -->
  </div>
</template>

<script>
import { fromNowFilter, accountFilter } from '../utils/mixins.js'

export default {
  props: {
    tweet: {
      type: Object,
      required: true
    }
  },
  mixins: [fromNowFilter, accountFilter],
}
</script>
