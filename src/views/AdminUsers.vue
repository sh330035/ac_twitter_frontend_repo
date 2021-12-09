<template>
  <div class="admin-users">
    <section class="center-view">
      <page-name-banner :banner-title="bannerTitle" />
      <ScaleLoader :is-loading="isLoading"/>
      <admin-user-cards v-if="!isLoading" :users="users" />
    </section>
    <Toast :ToastMessage="ToastMessage" />
  </div>
</template>

<script>
import PageNameBanner from '../components/PageNameBanner.vue'
import AdminUserCards from '../components/admin/AdminUserCards.vue'
import Toast from "../components/AlertToast.vue"
import ScaleLoader from "../components/ScaleLoader.vue"
import adminAPI from '../api/admin.js'

export default {
  components: {
    AdminUserCards,
    PageNameBanner,
    Toast,
    ScaleLoader,
  },
  data() {
    return {
      bannerTitle: '使用者列表',
      users: [],
      ToastMessage: {
        message: "",
        dataStatus: "",
      },
      isLoading: true,
    }
  },
  created() {
    this.isLoading = true
    this.fetchUsersData()
  },
  methods: {
    async fetchUsersData() {
      try {
        const { data } = await adminAPI.getAdminUsers()
        this.users = data.map(user => {
          const { id, account, name, avatar, cover, tweetCount, likeCount, followerCount, followingCount } = user
          return { id, account, name, avatar, cover, tweetCount, likeCount, followerCount, followingCount }
        })
        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.ToastMessage.message = `無法取得使用者資料，請稍後再試`
        this.ToastMessage.dataStatus = 'error'
        this.isLoading = false
      }
    },
  }
}
</script>
