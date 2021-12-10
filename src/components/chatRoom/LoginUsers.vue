<template>
  <section class="login-users">
    <div class="page-name-banner">
      <div class="banner">
        <div class="banner__other-page d-flex">
          <span class="banner__other-page__info">
            <h2>上線使用者 ({{ userCount }})</h2>
          </span>
        </div>
      </div>
      <div class="login-user">
        <div class="login-user__list"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login-users",
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