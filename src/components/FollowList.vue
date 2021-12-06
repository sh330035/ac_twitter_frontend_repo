<template>
  <div class="follow">
    <div class="follow__list d-flex">
      <span>
        <img
          src="https://randomuser.me/api/portraits/women/81.jpg"
          alt=""
          class="follow__list__image avatar-50"
          @click.prevent.stop="toUserPage(1)"
        />
      </span>
      <div class="follow__list__container d-flex-col">
        <div class="follow__list__user">
          <h2
            class="follow__list__user__name user-name-text"
            @click.prevent.stop="toUserPage(1)"
          >
            apple
          </h2>
          <span class="follow__list__user__account user-account-text">{{
            "apple" | accountTag
          }}</span>
        </div>
        <div class="follow__list__descriptoion">
          <p class="description-15">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            olestias dolor quisquam aspernatur quod Lorem ipsum dolor sit
          </p>
        </div>
      </div>
      <div class="follow__list__button">
        <button
          class="btn-follow"
          v-if="!Follower.isFollowed"
          @click.prevent.stop="addFollowing(Follower.id)"
        >
          跟隨
        </button>
        <button
          class="btn-following"
          v-else
          @click.prevent.stop="deleteFollowing(Follower.id)"
        >
          正在跟隨
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, accountFilter } from "../utils/mixins.js";

export default {
  name: "follow-list",
  props: {},
  // 假的資料，之後要用prop傳
  data() {
    return {
      Follower: { id: 1, isFollowed: false },
    };
  },
  mixins: [fromNowFilter, accountFilter],
  methods: {
    toUserPage(userId) {
      this.$router.push({ name: "user", params: { id: userId } });
    },
    addFollowing(userId) {
      console.log(userId);
      this.Follower.isFollowed = true;
    },
    deleteFollowing(userId) {
      console.log(userId);
      this.Follower.isFollowed = false;
    },
  },
};
</script>