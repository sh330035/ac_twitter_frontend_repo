<template>
  <div class="test-page">
    <!-- 測試頁面，確認字體有拉到 SCSS 的樣式 -->
    <section class="center-view">
      <page-name-banner :banner-title="bannerTitle" :banner-link-back="bannerLinkBack" />
      <h1>This is Tweet Reply List</h1>
    </section>
    <section class="right-card">
      <PopularUsersCard />
    </section>
  </div>
</template>

<script>
import PopularUsersCard from "../components/PopularUsersCard.vue"
import PageNameBanner from "../components/PageNameBanner.vue";

export default {
  components: {
    PopularUsersCard,
    PageNameBanner
  },
  data () {
    return {
      bannerLinkBack: true,
      bannerTitle: '返回',
    }
  }
};
</script>
