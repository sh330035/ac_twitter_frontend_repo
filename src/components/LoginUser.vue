<template>
  <div class="login-users">
    <div class="banner page-name-banner">
      <div class="banner__other-page d-flex">
        <span class="banner__other-page__info">
          <h2>上線使用者 ({{ userCount }})</h2>
        </span>
      </div>
    </div>
    <div class="login-user">
      <div
        class="login-user__list d-flex"
        v-for="user in loginUsers"
        :key="user.id"
      >
        <span
          ><router-link :to="{ name: 'user', params: { id: user.id } }">
            <img
              :src="user.avatar"
              alt=""
              class="popular__card__user__avatar avatar-50"
          /></router-link>
        </span>
        <div class="popular__card__user__name d-flex">
          <p class="user-name-text" @click.prevent.stop="toUserPage(user.id)">
            {{ user.name }}
          </p>
          <p class="user-account-text">
            {{ user.account | accountTag }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accountFilter } from "../utils/mixins.js";

export default {
  name: "Login-users",
  mixins: [accountFilter],
  data() {
    return {
      loginUsers: [
        {
          id: 8,
          name: "Apple",
          account: "apple",
          avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        },
        {
          id: 10,
          name: "Orange",
          account: "orange",
          avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        },
      ],
    };
  },
  computed: {
    userCount() {
      const userCount = this.loginUsers.length;
      return userCount;
    },
  },
};
</script>
<style scoped>
.popular__card__user__name {
  flex-wrap: wrap;
}
</style>
