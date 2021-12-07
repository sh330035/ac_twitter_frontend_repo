<template>
  <div class="follow">
    <div class="follow__list d-flex" v-for="follow in follows" :key="follow.id">
      <span>
        <img
          :src="follow.avatar"
          alt=""
          class="follow__list__image avatar-50"
          @click.prevent.stop="toUserPage(follow.id)"
        />
      </span>
      <div class="follow__list__container d-flex-col">
        <div class="follow__list__user">
          <h2
            class="follow__list__user__name user-name-text"
            @click.prevent.stop="toUserPage(follow.id)"
          >
            {{ follow.name }}
          </h2>
          <span class="follow__list__user__account user-account-text">{{
            follow.account | accountTag
          }}</span>
        </div>
        <div class="follow__list__descriptoion">
          <p class="description-15">
            {{ follow.introduction }}
          </p>
        </div>
      </div>
      <div class="follow__list__button">
        <button
          class="btn-follow"
          v-if="!follow.isFollowed"
          @click.prevent.stop="addFollowhandler(follow.id)"
        >
          跟隨
        </button>
        <button
          class="btn-following"
          v-else
          @click.prevent.stop="deleteFollowhandler(follow.id)"
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
  props: {
    follows: {
      type: Array,
      required: true,
    },
  },
  mixins: [fromNowFilter, accountFilter],
  methods: {
    toUserPage(userId) {
      this.$router.push({ name: "user", params: { id: userId } });
    },
    addFollowhandler(userId) {
      this.$emit("after-add-follow", userId);
    },
    deleteFollowhandler(userId) {
      this.$emit("after-delete-follow", userId);
    },
  },
};
</script>