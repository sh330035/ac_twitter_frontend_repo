<template>
  <div id="twitter-app">
    <Navbar v-if="this.$store.state.isAuthenticated" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: { Navbar },
  data() {
    return {};
  },
};
</script>
