<template>
  <div class="tweets-page">
    <!-- 測試頁面，確認字體有拉到 SCSS 的樣式 -->
    <section class="center-view">
      <PageNameBanner :banner-title="bannerTitle"/>
      <h1>This is Tweets Main Page</h1>
    </section>
    <section class="right-card">
      <PopularUsersCard />
    </section>
  </div>
</template>

<script>
import PopularUsersCard from "../components/PopularUsersCard.vue";
import PageNameBanner from "../components/PageNameBanner.vue";

export default {
  components: {
    PopularUsersCard,
    PageNameBanner,
  },
  data () {
    return { 
      bannerTitle: '首頁'
    }
  }
};
</script>
