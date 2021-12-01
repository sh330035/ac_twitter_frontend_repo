<template>
  <div id="twitter-app">
    <Navbar />
    <router-view />
    <PopularUsersCard />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import PopularUsersCard from "./components/PopularUsersCard.vue";
export default {
  name: "App",
  components: { Navbar, PopularUsersCard },
};
</script>

<style>
#twitter-app {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  height: 100%;
  max-width: 1440px;
}
router-view {
  margin: 0 20px 0 20px;
}
</style>
