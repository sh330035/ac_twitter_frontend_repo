<template>
  <div class="notice">
    <section class="center-view">
      <PageNameBanner :banner-title="bannerTitle" />
      <h1>Notice</h1>
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
  name: "Notice",
  components: {
    PopularUsersCard,
    PageNameBanner,
  },
  data() {
    return {
      bannerTitle: "通知",
    };
  },
};
</script>