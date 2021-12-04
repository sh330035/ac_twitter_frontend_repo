<template>
  <div class="popular">
    <div class="popular__card">
      <h2 class="popular__card__title">Popular</h2>
      <div
        class="popular__card__user d-flex"
        v-for="popularUser in popularUsers"
        :key="popularUser.id"
      >
        <span
          ><router-link to="user">
            <img
              :src="popularUser.avatar"
              alt=""
              class="popular__card__user__avatar avatar-50"
          /></router-link>
        </span>
        <div class="popular__card__user__name d-flex-col">
          <p class="user-name-text">{{ popularUser.name }}</p>
          <p class="user-account-text">
            {{ popularUser.account | accountTag }}
          </p>
        </div>
        <div class="popular__card__user__button">
          <button
            class="btn-follow"
            v-if="!popularUser.isFollowed"
            @click.prevent.stop="addFollowing(popularUser.id)"
          >
            跟隨
          </button>
          <button
            class="btn-following"
            v-else
            @click.prevent.stop="deleteFollowing(popularUser.id)"
          >
            正在跟隨
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accountFilter } from "../utils/mixins.js";

const dummyData = {
  users: [
    {
      id: "5",
      name: "google",
      account: "google-map",
      avatar: "https://randomuser.me/api/portraits/women/83.jpg",
      FollowerCount: 1200,
      isFollowed: true,
    },
    {
      id: "9",
      name: "Apple",
      account: "Apple-store",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      FollowerCount: 900,
      isFollowed: false,
    },
    {
      id: "8",
      name: "Android",
      account: "smart",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      FollowerCount: 700,
      isFollowed: false,
    },
  ],
};

export default {
  name: "popular-user",
  mixins: [accountFilter],
  data() {
    return {
      popularUsers: [],
    };
  },
  created() {
    this.fetchPopularUsers();
  },
  methods: {
    fetchPopularUsers() {
      this.popularUsers = dummyData.users;
    },
    addFollowing(userId) {
      this.popularUsers = this.popularUsers.map((user) => {
        if (user.id !== userId) {
          return user;
        } else {
          return {
            ...user,
            isFollowed: true,
          };
        }
      });
    },
    deleteFollowing(userId) {
      this.popularUsers = this.popularUsers.map((user) => {
        if (user.id !== userId) {
          return user;
        } else {
          return {
            ...user,
            isFollowed: false,
          };
        }
      });
    },
  },
};
</script>

<style scoped>
.popular {
  height: 100vh;
  min-width: 410px;
  /* border: 1px solid red; */
}
</style>