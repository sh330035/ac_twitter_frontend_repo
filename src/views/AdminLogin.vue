<template>
  <section class="center-view">
    <div class="admin-login">
      <Toast :ToastMessage="ToastMessage" />
      <div class="logo"></div>
      <h2>後台登入</h2>
      <account-login-form @after-form-submit="afterFormSubmit" />
      <div class="login__actions">
        <router-link class="link" to="/login">前台登入</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import AccountLoginForm from "../components/AccountLoginForm.vue"
import Toast from "../components/AlertToast.vue"

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
    }
  },
  methods: {
    afterFormSubmit(accountDetail) {
      console.log("註冊資料送出：", accountDetail)

      // Toast 測試 模擬Email重複
      if (this.backendReturnStatus) {
        this.sendToastMessage()
        return
      }

      this.$router.push({ name: "admin-tweets" })
    },
    // 修改 toast message 讓 toast 監看到變化，觸發視窗跳出
    sendToastMessage() {
      this.ToastMessage.dataStatus = ""
      this.ToastMessage.dataStatus = "error"
      this.ToastMessage.message = "______"
    },
  },
};
</script>
