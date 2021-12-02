<template>
  <div id="twitter-app">
    <Navbar v-if="isAuthenticated" />
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
    return {
      // 暫時加，方便製作登入畫面
      isAuthenticated: true,
    };
  },
};
</script>
