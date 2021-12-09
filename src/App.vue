<template>
  <div id="twitter-app">
    <Navbar v-if="isAuthenticated" />
    <Toast :appToastMessage="appToastMessage" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Toast from "./components/AppToast.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: { Navbar, Toast },
  data() {
    return {
      appToastMessage: {
        message: "",
        dataStatus: "",
      },
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated", "alertAuthentication"]),
  },
  watch: {
    alertAuthentication: {
      handler: function () {
        this.sendToastMessage("帳號不存在");
      },
      deep: true,
    },
  },
  methods: {
    sendToastMessage(message) {
      this.appToastMessage.message = "";
      this.appToastMessage.dataStatus = "error";
      this.appToastMessage.message = message;
    },
  },
};
</script>
