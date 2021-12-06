<template>
  <section class="center-view">
    <div class="login">
      <Toast :ToastMessage="ToastMessage" />
      <div class="logo"></div>
      <h2>登入 Alphitter</h2>
      <account-login-form
        @after-form-submit="afterFormSubmit"
        :isProcessing="isProcessing"
      />
      <div class="login__actions">
        <router-link class="link" to="/register">註冊 Alphitter</router-link>
        <span>・</span>
        <router-link class="link" to="/admin/login">後台登入</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import AccountLoginForm from "../components/AccountLoginForm.vue";
import Toast from "../components/AlertToast.vue";
import authorizationAPI from "../api/authorization";

export default {
  name: "login-page",
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
      // 防止使用者重複點擊
      isProcessing: false,
    };
  },
  methods: {
    async afterFormSubmit(accountDetail) {
      try {
        console.log("使用者登入資訊：", accountDetail);

        this.isProcessing = true;

        const response = await authorizationAPI.signIn({
          account: accountDetail.account,
          password: accountDetail.password,
        });

        const { data } = response;
        console.log(data)
        if (data.status !== "success") {
          this.sendToastMessage(data.message);
          throw new Error(data.message);
        }

        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.token);

        console.log(data.status, data.message);

        this.$router.push({ name: "tweets" });
      } catch (error) {
        console.log(error);

        this.isProcessing = false;

        return;
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
