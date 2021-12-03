<template>
  <div class="admin-users__cards-panel">
    <!-- v-for Start -->
    <div v-for="user in users" :key="user.id" class="user-card">
      <div class="user-card__pictures">
        <img class="user-card__pictures__cover" src="https://loremflickr.com/320/240/city/?random=21" alt="User Cover">
        <img class="user-card__pictures__avatar" src="https://randomuser.me/api/portraits/women/16.jpg" alt="">
      </div>
      <div class="user-card__detail">
        <div class="user-card__detail__name">{{ user.name }}</div>
        <div class="user-card__detail__account">{{ user.account | accountTag }}</div>
        <div class="user-card__detail__social-activities">
          <span class="user-card__detail__social-activities__reply-icon"></span>
          <span class="user-card__detail__social-activities__tweet-count">{{ user.tweetCount | numberFormatEng }}</span>
          <span class="user-card__detail__social-activities__like-icon"></span>
          <span class="user-card__detail__social-activities__like-count">{{ user.likeCount | numberFormatEng }}</span>
        </div>
        <div class="user-card__detail__follow-info">
          <div class="user-card__detail__follow-info__following">
            <span class="user-card__detail__follow-info__following__count">{{ user.followingCount | numberFormatTC }} 個</span>跟隨中
          </div>
          <div class="user-card__detail__follow-info__following">
            <span class="user-card__detail__follow-info__follower__count">{{ user.followerCount | numberFormatTC }} 位</span>跟隨者
          </div>
        </div>


      </div>
    </div>
    <!-- v-for End -->
  </div>
</template>

<script>
import { accountFilter, numberFilterEng, numberFilterTC } from '../../utils/mixins.js'


export default {
  props: {
    users: {
      type: Array,
      required: true,
    }
  },
  mixins: [accountFilter, numberFilterEng, numberFilterTC],

}
</script>
