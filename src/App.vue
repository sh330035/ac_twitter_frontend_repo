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
import { mapState } from "vuex";

export default {
  name: "App",
  components: { Navbar },
  data() {
    return {};
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>
