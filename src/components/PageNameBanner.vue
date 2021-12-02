<template>
  <div class="page-name-banner">
    <div class="banner">
      <!-- tweets page banner -->
      <div
        v-if="this.currentRouterName == 'tweets'"
        class="banner__tweets-page d-flex"
      >
        <span><h2>首頁</h2></span>
      </div>
      <!-- user page banner -->
      <div
        v-if="this.currentRouterName == 'user'"
        class="banner__user-page d-flex"
      >
        <span
          ><img
            @click="$router.back()"
            src="../assets/images/back.svg"
            alt=""
            class="banner__user-page__back"
        /></span>
        <span class="banner__user-page__info"
          ><h2 class="banner__user-page__name">{{ this.user.name }}</h2>
          <p class="banner__user-page__tweets-count">
            {{ this.user.tweetsCount }} 推文
          </p>
        </span>
      </div>
      <!-- setting page banner -->
      <div
        v-if="this.currentRouterName == 'account-setting'"
        class="banner__setting-page d-flex"
      >
        <span><h2>帳戶設定</h2></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      currentRouterName: "",
      currentRouterParams: "",
    };
  },
  methods: {
    getRouterName() {
      this.currentRouterName = this.$route.name;
      this.currentRouterParams = this.$route.params.id;
      console.log(this.currentRouterName, this.currentRouterParams);
    },
  },
  created() {
    this.getRouterName();
  },
};
</script>
