<template>
  <div class="setting">
    <section class="center-view">
      <PageNameBanner :banner-title="bannerTitle"/>
      <account-setting-form
        :initial-account-detail="accountDetail"
        @after-form-submit="afterFormSubmit"
      />
    </section>
  </div>
</template>

<script>
import AccountSettingForm from "../components/AccountSettingForm.vue";
import PageNameBanner from "../components/PageNameBanner.vue";

const dummyData = {
  currentUser: {
    id: 1,
    account: "user1",
    email: "user1@email.com",
    name: "User1",
    password: "12345678",
    role: "user",
  },
};

export default {
  name: "Setting",
  components: {
    PageNameBanner,
    AccountSettingForm,
  },
  data() {
    return {
      bannerTitle: '帳戶設定',
      accountDetail: {
        account: "",
        name: "",
        email: "",
        password: "",
        passwordCheck: "",
        role: "user",
      },
    };
  },
  created() {
    // TODO : 等 route 建好後，需更新此行：
    // const userId = this.$route.id
    const userId = 2;
    this.fetchUserAccountDetail(userId);
  },
  methods: {
    fetchUserAccountDetail(userId) {
      // TODO: 串接 API
      console.log(`向後台拿取 user id-${userId} 資料`);
      this.accountDetail = {
        ...this.accountDetail,
        ...dummyData.currentUser,
      };
    },
    afterFormSubmit(accountDetail) {
      console.log("註冊資料送出：", accountDetail);
      // redirect to user profile of this current user 
      this.$router.push({name: 'user', params: dummyData.currentUser.id})
    },
  },
};
</script>
