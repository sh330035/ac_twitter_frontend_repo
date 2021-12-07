<template>
  <div class="setting">
    <section class="center-view">
      <PageNameBanner :banner-title="bannerTitle" />
      <account-setting-form
        :initial-account-detail="accountDetail"
        :is-processing="isProcessing"
        @after-form-submit="afterFormSubmit"
      />
    </section>
    <Toast :ToastMessage="ToastMessage" />
  </div>
</template>

<script>
import AccountSettingForm from "../components/AccountSettingForm.vue"
import PageNameBanner from "../components/PageNameBanner.vue"
import usersAPI from '../api/users.js'
import Toast from "../components/AlertToast.vue"

export default {
  name: "Setting",
  components: {
    PageNameBanner,
    AccountSettingForm,
    Toast
  },
  data() {
    return {
      bannerTitle: '帳戶設定',
      accountDetail: {
        id: -1,
        account: "",
        name: "",
        email: "",
        password: "",
        passwordCheck: "",
        role: "user",
      },
      isProcessing: false,
      ToastMessage: {
        message: "",
        dataStatus: "",
      },
    }
  },
  created() {
    // TODO : 等 route 建好後，需更新此行：
    // const userId = this.$route.id
    const userId = 2
    this.fetchUserAccountDetail(userId)
  },
  methods: {
    async fetchUserAccountDetail(userId) {
      try {
        const { data } = await usersAPI.getCurrentUser(userId)
        this.accountDetail = {
          ...this.accountDetail,
          ...data,
        }
      } catch (error) {
        console.log('error:', error)
        this.ToastMessage.message = `無法取得設定資料，請稍後再試`
        this.ToastMessage.dataStatus = 'error'
      }
    },
    async afterFormSubmit(formData) {
      try {
        this.isProcessing = true
        const userId = this.accountDetail.id
        const { data } = await usersAPI.updateUserSetting({ userId, formData })
        console.log(data)

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.ToastMessage.message = `個人設定已成功更新`
        this.ToastMessage.dataStatus = 'success'
        this.isProcessing = false
        // redirect to user profile page after Toast show up
        setTimeout(() => {
          this.$router.push({ name: 'user', params: { id: userId } })
        }, 1200)
      } catch (error) {
        console.log('error:', error)
        this.ToastMessage.message = `無法更新設定，請稍後再試`
        this.ToastMessage.dataStatus = 'error'
      }
    },
  },
};
</script>
