<template>
  <section class="login-users">
    <div class="banner page-name-banner">
      <div class="banner__other-page d-flex">
        <span class="banner__other-page__info">
          <h2>上線使用者 ({{ userCount }})</h2>
        </span>
      </div>
    </div>
    <div class="login-users">
      <div
        class="login-users__list d-flex"
        v-for="user in loginUsers"
        :key="user.id"
      >
        <span
          ><router-link :to="{ name: 'user', params: { id: user.id } }">
            <img
              :src="user.avatar"
              alt=""
              class="login-users__avatar avatar-50"
          /></router-link>
        </span>
        <div class="login-users__name d-flex">
          <p class="user-name-text" @click.prevent.stop="toUserPage(user.id)">
            {{ user.name }}
          </p>
          <p class="user-account-text">
            {{ user.account | accountTag }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { accountFilter } from "../../utils/mixins";

const dummyData = {
  userData: [
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
    {
      id: 9,
      name: "Apple",
      account: "apple",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 7,
      name: "Orange",
      account: "orange",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 6,
      name: "Apple",
      account: "apple",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 5,
      name: "Orange",
      account: "orange",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 4,
      name: "Apple",
      account: "apple",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 3,
      name: "Orange",
      account: "orange",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 1,
      name: "Apple",
      account: "apple",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 2,
      name: "Orange",
      account: "orange",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ],
};

export default {
  name: "Login-users",
  mixins: [accountFilter],
  // 感覺這邊應該用 props 的方式
  data() {
    return {
      loginUsers: [],
    };
  },
  computed: {
    userCount() {
      const userCount = this.loginUsers.length;
      return userCount;
    },
  },
  created() {
    this.fetchLoginUsers();
  },
  methods: {
    fetchLoginUsers() {
      // API 串接
      this.loginUsers = dummyData.userData;
    },
    toUserPage(userId) {
      this.$router.push({ name: "user", params: { id: userId } });
    },
  },
};
</script>
