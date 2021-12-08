<template>
  <div class="page-name-banner">
    <!-- user page banner -->

    <div
      class="banner-user"
      v-if="
        this.currentRouterName == 'user' ||
        this.currentRouterName == 'user-follow'
      "
    >
      <div class="banner-user__user-page d-flex">
        <span
          ><img
            @click="$router.push({name: 'tweets'})"
            src="../assets/images/back.svg"
            alt=""
            class="banner-user__user-page__back"
        /></span>
        <span class="banner-user__user-page__info">
          <h2 class="banner-user__user-page__name">{{ this.user.name }}</h2>
          <p class="banner-user__user-page__tweets-count">
            {{ this.user.tweetsCount }} 推文
          </p>
        </span>
      </div>
    </div>
    <!-- other page banner -->
    <div class="banner" v-else>
      <div v-if="bannerTitle" class="banner__other-page d-flex">
        <span v-if="bannerLinkBack" class="banner__other-page__image"
          ><img
            @click="$router.back()"
            src="../assets/images/back.svg"
            alt=""
            class="banner__other-page__arrow"
        /></span>
        <span class="banner__other-page__info">
          <h2>
            {{ bannerTitle }}
          </h2>
        </span>
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
    bannerTitle: {
      type: String,
    },
    bannerLinkBack: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentRouterName: "",
    };
  },
  methods: {
    getRouterName() {
      this.currentRouterName = this.$route.name;
    },
  },
  created() {
    this.getRouterName();
  },
};
</script>
