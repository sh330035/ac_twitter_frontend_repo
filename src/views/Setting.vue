<template>
  <div class="setting">
    <section class="center-view">
      <account-setting-form
        :initial-account-detail="accountDetail"
        @after-form-submit="afterFormSubmit"
      />
    </section>
  </div>
</template>

<script>
import AccountSettingForm from '../components/AccountSettingForm.vue'

const dummyData = {
  user: {
    id: 1,
    account: 'user1',
    email: 'user1@email.com',
    name: 'User1',
    password: '12345678',
    role: 'user'
  }
}

export default {
  name: 'Setting',
  components: {
    AccountSettingForm,
  },
  data() {
    return {
      accountDetail: {
        account: '',
        name: '',
        email: '',
        password: '',
        passwordCheck: '',
        role: 'user'
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
    fetchUserAccountDetail(userId) {
      // TODO: 串接 API
      console.log(`向後台拿取 user id-${userId} 資料`)
      this.accountDetail = {
        ...this.accountDetail,
        ...dummyData.user
      }
    },
    afterFormSubmit(accountDetail) {
      console.log('註冊資料送出：', accountDetail)
    }
  }
}
</script>
