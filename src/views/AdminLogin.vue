<template>
  <section class="center-view">
    <div class="admin-login">
      <Toast :ToastMessage="ToastMessage" />
      <div class="logo"></div>
      <h2>後台登入</h2>
      <account-login-form
        @after-form-submit="afterFormSubmit"
        :isProcessing="isProcessing"
        :clearPasswordInput="clearPasswordInput"
      />
      <div class="login__actions">
        <router-link class="link" to="/login">前台登入</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import AccountLoginForm from "../components/AccountLoginForm.vue";
import Toast from "../components/AlertToast.vue";
import adminAPI from "../api/admin";

export default {
  components: {
    AccountLoginForm,
    Toast,
  },
  data() {
    return {
      // 母層須 props 此物件給 Toast 做為控制參數
      ToastMessage: {
        message: "",
        dataStatus: "",
      },
      // 預設後端回傳錯誤訊息
      backendReturnStatus: false,
      // 防止使用者重複點擊
      isProcessing: false,
      clearPasswordInput: false,
    };
  },
  methods: {
    async afterFormSubmit(accountDetail) {
      try {
        this.isProcessing = true;
        this.clearPasswordInput = false
        
        const { data } = await adminAPI.adminSignIn({
          account: accountDetail.account,
          password: accountDetail.password,
        });

        // 檢驗登入成功 & 帳號 role
        if (data.status !== "success") {
          this.sendToastMessage(data.message);
          throw new Error(data.message);
        } else if (data.user.role !== "admin") {
          this.sendToastMessage("帳號不存在或密碼錯誤!");
          throw new Error();
        }

        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.token);

        // 將資料傳到 Vuex 中
        this.$store.commit("setCurrentUser", data.user);

        this.$router.push({ name: "admin-tweets" });
      } catch (error) {
        console.log(error);
        this.isProcessing = false;
        this.clearPasswordInput = true
      }
    },
    // 修改 toast message 讓 toast 監看到變化，觸發視窗跳出
    sendToastMessage(message) {
      this.ToastMessage.dataStatus = "";
      this.ToastMessage.dataStatus = "error";
      this.ToastMessage.message = message;
    },
  },
};
</script>
