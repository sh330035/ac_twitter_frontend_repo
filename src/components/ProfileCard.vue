<template>
  <div class="profile-card">
    <div class="profile-card__pictures">
      <img
        :src="user.cover"
        alt="User Cover"
        class="profile-card__pictures__cover"
      />
      <img
        :src="user.avatar"
        alt="Avatar"
        class="profile-card__pictures__avatar"
      />
    </div>
    <div class="profile-card__profile">
      <div class="profile-card__profile__action-buttons">
        <div class="profile-card__profile__action-buttons__social-actions">
          <span
            v-if="!user.isCurrentUser"
            class="
              profile-card__profile__action-buttons__social-actions__message
              icon
            "
          ></span>
          <span
            v-if="!user.isCurrentUser && user.isNoticed"
            @click="toggleNotification('off')"
            class="
              profile-card__profile__action-buttons__social-actions__notification-on
              icon
            "
          ></span>
          <span
            v-if="!user.isCurrentUser && !user.isNoticed"
            @click="toggleNotification('on')"
            class="
              profile-card__profile__action-buttons__social-actions__notification-off
              icon
            "
          ></span>
          <span
            v-if="!user.isCurrentUser"
            @click="toggleIsFollowed"
            class="
              profile-card__profile__action-buttons__social-actions__follow
              btn
            "
            :class="{ inactive: !user.isFollowed }"
            >{{ user.isFollowed ? "正在跟隨" : "跟隨" }}</span
          >
        </div>
        <div
          v-if="user.isCurrentUser"
          @click="showSettingForm"
          class="profile-card__profile__action-buttons__profile-setting btn"
        >
          編輯個人資料
        </div>
      </div>
      <div class="profile-card__profile__name">{{ user.name }}</div>
      <div class="profile-card__profile__account">
        {{ user.account | accountTag }}
      </div>
      <div class="profile-card__profile__introduction">
        {{ user.introduction }}
      </div>
      <div class="profile-card__profile__social-count">
        <router-link
          :to="{
            name: 'user-follow',
            params: { id: user.id },
            query: { follow: 'following' },
          }"
          class="profile-card__profile__social-count__follow"
        >
          <span class="profile-card__profile__social-count__follow__count"
            >{{ user.followingCount | numberFormatTC }} 個</span
          >跟隨中
        </router-link>
        <router-link
          :to="{ name: 'user-follow', params: { id: user.id } }"
          class="profile-card__profile__social-count__follow"
        >
          <span class="profile-card__profile__social-count__follow__count"
            >{{ user.followerCount | numberFormatTC }} 位</span
          >跟隨者
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { accountFilter, numberFilterTC } from "../utils/mixins.js";

export default {
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  mixins: [accountFilter, numberFilterTC],
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.updateUserData();
  },
  watch: {
    "initialUser.id": function () {
      this.updateUserData();
    },
  },
  methods: {
    updateUserData() {
      this.user = {
        ...this.user,
        ...this.initialUser,
      };
    },
    toggleNotification(status) {
      this.$emit("after-toggle-notification", status);
      // 父層：
      // if (status === 'on') {
      //   API put 讓 isNoticed = true
      // } else {
      //   API put 讓 isNoticed = false
      // }

      this.user.isNoticed = !this.user.isNoticed;
    },
    toggleIsFollowed() {
      this.$emit("after-toggle-isFollowed", !this.user.isFollowed);
      // 父層：
      // if (this.user.toggleIsFollowed) {
      //   API put 讓 toggleIsFollowed = true
      // } else {
      //   API put 讓 toggleIsFollowed = false
      // }
      this.user.isFollowed = !this.user.isFollowed;
    },
    showSettingForm() {
      this.$emit("show-setting-form");
    },
  },
};
</script>
