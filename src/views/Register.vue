<template>
  <div class="register">
    <div class="logo"></div>
    <h2>建立你的帳號</h2>
    <account-setting-form @after-form-submit="afterFormSubmit" />
  </div>
</template>

<script>
import AccountSettingForm from '../components/AccountSettingForm.vue'

export default {
  components: {
    AccountSettingForm,
  },
  methods: {
    afterFormSubmit(accountDetail) {
      console.log('註冊資料送出：', accountDetail)
    }
  }
}
</script>
