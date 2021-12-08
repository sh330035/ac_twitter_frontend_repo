<template>
  <section class="center-view">
    <div class="register">
      <Toast :ToastMessage="ToastMessage" />

      <div class="logo"></div>
      <h2>建立你的帳號</h2>
      <account-setting-form @after-form-submit="afterFormSubmit" :clearPasswordInput="clearPasswordInput" />
      <span class="link" @click="$router.push('/login')">取消</span>
    </div>
  </section>
</template>

<script>
import AccountSettingForm from "../components/AccountSettingForm.vue"
import Toast from "../components/AlertToast.vue"
import authorizationAPI from '../api/authorization.js'

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
      isProcessing: false,
      clearPasswordInput: false,
      // 預設後端回傳錯誤訊息
      backendReturnStatus: false,
    }
  },
  methods: {
    async afterFormSubmit({ account, name, email, password, checkPassword }) {
      try {
        this.isProcessing = true;
        this.clearPasswordInput = false
        const { data } = await authorizationAPI.signUp({ account, name, email, password, checkPassword })
        console.log(data)
        if (data.status !== 'success') {
          throw new Error(data.message)
        } else {
          this.ToastMessage.dataStatus = "";
          this.ToastMessage.dataStatus = "success"
          this.ToastMessage.message = `${data.message}`
          setTimeout(() => {
            this.$router.push({ name: "login" })
          }, 1200)
        }
      } catch (error) {
        this.isProcessing = false;
        this.clearPasswordInput = true
        this.ToastMessage.dataStatus = "";
        this.ToastMessage.dataStatus = "error"
        this.ToastMessage.message = `${error}`
      }
    },
  },
};
</script>
