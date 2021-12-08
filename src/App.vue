<template>
  <div id="twitter-app">
    <Navbar v-if="isAuthenticated" />
    <main>
      <router-view v-if="isRouteAlive" @reload="reload" />
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
    return {
      isRouteAlive: true,
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    reload() {
      this.isRouteAlive = false;
      this.isRouteAlive = true;
    },
  },
};
</script>
