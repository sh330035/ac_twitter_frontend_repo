<template>
  <nav class="navbar">
    <a href="/" class="link navbar_brand"
      ><div class="navbar_brand_logo"></div>
    </a>
    <div class="navbar_link" v-if="currentUser.role == 'user'">
      <router-link to="/tweets" class="link navbar_link_home-page">
        <div class="navbar_link_content">
          <div class="navbar_link_icon navbar_link_icon_home-page"></div>
          <h2 class="navbar_link_text">首頁</h2>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'user', params: { id: this.$store.state.currentUser.id } }"
        class="link navbar_link_user-page"
      >
        <div class="navbar_link_content">
          <div class="navbar_link_icon navbar_link_icon_user-page"></div>
          <h2 class="navbar_link_text">個人資料</h2>
        </div>
      </router-link>
      <router-link
        :to="{
          name: 'account-setting',
          params: { id: this.$store.state.currentUser.id },
        }"
        class="link navbar_link_setting-page"
      >
        <div class="navbar_link_content">
          <div class="navbar_link_icon navbar_link_icon_setting-page"></div>
          <h2 class="navbar_link_text">設定</h2>
        </div>
      </router-link>
    </div>
    <div class="navbar_link" v-if="currentUser.role == 'admin'">
      <router-link to="/admin/tweets" class="link navbar_link_home-page">
        <div class="navbar_link_content">
          <div class="navbar_link_icon navbar_link_icon_home-page"></div>
          <h2 class="navbar_link_text">推文清單</h2>
        </div>
      </router-link>
      <router-link to="/admin/users" class="link navbar_link_user-page">
        <div class="navbar_link_content">
          <div class="navbar_link_icon navbar_link_icon_user-page"></div>
          <h2 class="navbar_link_text">使用者列表</h2>
        </div>
      </router-link>
    </div>
    <div class="navbar_link_tweet-launch">
      <NewTweetModal
        v-if="isModelShowed"
        @after-tweet-checkout="afterTweetCheckout"
        @after-tweet-send="afterTweetSend"
      />
      <Toast :NavbarToastMessage="NavbarToastMessage" />
      <button
        @click.prevent.stop="tweetLaunchHandler"
        class="btn tweet-launch_button"
        v-if="currentUser.role == 'user'"
      >
        推文
      </button>
    </div>
    <div class="navbar_link_logout">
      <div class="navbar_link_content" @click="logout">
        <div class="navbar_link_icon navbar_link_icon_logout"></div>
        <h2 class="navbar_link_text">登出</h2>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import NewTweetModal from "../components/NewTweetModal.vue";
import Toast from "../components/NavbarAlertToast.vue";

export default {
  name: "nav-bar",
  components: { NewTweetModal, Toast },
  data() {
    return {
      isModelShowed: false,
      // 母層須 props 此物件給 Toast 做為控制參數
      NavbarToastMessage: {
        message: "",
        dataStatus: "",
      },
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    tweetLaunchHandler() {
      this.isModelShowed = true;
    },
    afterTweetCheckout() {
      this.isModelShowed = false;
    },
    afterTweetSend(dataStatus) {
      if (!dataStatus) {
        this.sendToastMessage("error");
      } else {
        this.sendToastMessage("success");
      }
      // 修改 vuex 狀態
      this.$store.commit("renderTweet");
      this.$store.commit("renderTweet");
    },
    // 修改 toast message 讓 toast 監看到變化，觸發視窗跳出
    sendToastMessage(status) {
      this.NavbarToastMessage.dataStatus = "";
      this.NavbarToastMessage.dataStatus = status;

      this.NavbarToastMessage.message = "推文發送成功";
    },
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/login");
    },
  },
};
</script>