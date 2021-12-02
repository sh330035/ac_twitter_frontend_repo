<template>
  <div class="page-name-banner">
    <div class="banner">
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
      <!-- other page banner -->
      <div v-if="bannerTitle" class="banner__other-page d-flex">
        <h2>
          <span
            v-if="bannerLinkBack"
            @click="$router.back()"
            class="banner__other-page__arrow"
          >
            &larr;
          </span>
          {{ bannerTitle }}
        </h2>
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
      type: String
    },
    bannerLinkBack: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentRouterName: "",
    }
  },
  methods: {
    getRouterName() {
      this.currentRouterName = this.$route.name
    },
  },
  created() {
    this.getRouterName()
  },
};
</script>
