<template>
  <div class="test-page">
    <!-- 測試頁面，確認字體有拉到 SCSS 的樣式 -->
    <section class="center-view">
      <h1>This is Tweet Reply List</h1>
    </section>
    <section class="right-card">
      <PopularUsersCard />
    </section>
  </div>
</template>

<script>
import PopularUsersCard from "../components/PopularUsersCard.vue"

export default {
  components: {
    PopularUsersCard
  },
};
</script>
