<template>
  <nav class="navbar">
    <a href="/" class="link navbar_brand"
      ><div class="navbar_brand_logo"></div>
    </a>
    <div class="navbar_link">
      <a href="/" class="link navbar_link_home-page">
        <div class="navbar_link_content">
          <div class="navbar_link_icon navbar_link_icon_home-page active"></div>
          <h2 class="navbar_link_text">首頁</h2>
        </div>
      </a>
      <a href="/user" class="link navbar_link_user-page">
        <div class="navbar_link_content">
          <div class="navbar_link_icon navbar_link_icon_user-page"></div>
          <h2 class="navbar_link_text">個人資料</h2>
        </div>
      </a>
      <a href="/setting" class="link navbar_link_setting-page">
        <div class="navbar_link_content">
          <div class="navbar_link_icon navbar_link_icon_setting-page"></div>
          <h2 class="navbar_link_text">設定</h2>
        </div>
      </a>
    </div>
    <div class="navbar_link_tweet-launch">
      <NewTweetModal
        v-if="isModelShowed"
        @after-tweet-checkout="afterTweetCheckout"
        @after-tweet-send="afterTweetSend"
      />
      <Toast :ToastMessage="ToastMessage" />
      <button
        @click.prevent.stop="tweetLaunchHandler"
        class="btn tweet-launch_button"
      >
        推文
      </button>
    </div>
    <div class="navbar_link_logout">
      <a href="/logout" class="link navbar_link_logout">
        <div class="navbar_link_content">
          <div class="navbar_link_icon navbar_link_icon_logout"></div>
          <h2 class="navbar_link_text">登出</h2>
        </div>
      </a>
    </div>
  </nav>
</template>

<script>
import NewTweetModal from "../components/NewTweetModal.vue";
import Toast from "../components/AlertToast.vue";

export default {
  name: "test-page",
  components: { NewTweetModal, Toast },
  data() {
    return {
      isModelShowed: false,
      // 母層須 props 此物件給 Toast 做為控制參數
      ToastMessage: {
        message: "",
        dataStatus: "",
      },
      // 預設後端回傳正確訊息
      backendReturnStatus: true,
    };
  },
  methods: {
    tweetLaunchHandler() {
      this.isModelShowed = true;
    },
    afterTweetCheckout() {
      this.isModelShowed = false;
    },
    afterTweetSend() {
      // Toast 測試 模擬Email重複
      if (!this.backendReturnStatus) {
        this.sendToastMessage("error");
      } else {
        this.sendToastMessage("success");
      }
    },
    // 修改 toast message 讓 toast 監看到變化，觸發視窗跳出
    sendToastMessage(status) {
      this.ToastMessage.dataStatus = "";
      this.ToastMessage.dataStatus = status;

      this.ToastMessage.message = "推文發送成功";
    },
  },
};
</script>

<style scoped>
.navbar {
  border: 1px solid red;
}
</style>