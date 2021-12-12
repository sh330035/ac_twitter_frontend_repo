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
import { mapState } from 'vuex'

export default {
  name: "Login-users",
  mixins: [accountFilter],
  data() {
    return {
      loginUsers: [
        
      ],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
    userCount() {
      const userCount = this.loginUsers.length;
      return userCount;
    },
  },
  created() {
    // current user 為最上方的上線使用者
    this.loginUsers = [{
          id: this.currentUser.id,
          account: this.currentUser.account,
          name: this.currentUser.name,
          avatar: this.currentUser.avatar
        }]
    // this.fetchLoginUsers();
     // 上線發出訊息報到
    this.sockets.subscribe('onlineHint', profile => {
      this.loginUsers.push(profile)
    })
    this.sockets.subscribe('offlineHint', profile => {
      this.loginUsers = this.loginUsers.filter(user => user.id !== profile.id)
    })
  },
  methods: {
    // fetchLoginUsers() {
    // this.sockets.subscribe('onlineMember', members => {
    //   members.forEach(member=> {
    //     if (member.id != this.currentUser.id) {
    //       this.loginUsers.push(member)
    //     }
    //   })
    // })
    // },
    toUserPage(userId) {
      this.$router.push({ name: "user", params: { id: userId } });
    },
  },
  sockets: {
    onlineHint: () => {},
    offlineHint: () => {
    },
    // onlineMember: (members) => {
    //   console.log('已上線的用戶',members)
    // }
  }
};
</script>
