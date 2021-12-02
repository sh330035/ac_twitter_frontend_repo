<template>
  <section class="center-view">
    <div class="register">
      <Toast :ToastMessage="ToastMessage" />

      <div class="logo"></div>
      <h2>建立你的帳號</h2>
      <account-setting-form @after-form-submit="afterFormSubmit" />
      <span class="link" @click="$router.push('/login')">取消</span>
    </div>
  </section>
</template>

<script>
import AccountSettingForm from "../components/AccountSettingForm.vue"
import Toast from "../components/AlertToast.vue"

export default {
  components: {
    AccountSettingForm,
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
      }

      this.$router.push({ name: "login" })
    },
    // 修改 toast message 讓 toast 監看到變化，觸發視窗跳出
    sendToastMessage() {
      this.ToastMessage.dataStatus = ""
      this.ToastMessage.dataStatus = "error"

      this.ToastMessage.message = "Email 已重複註冊!"
    },
  },
};
</script>
