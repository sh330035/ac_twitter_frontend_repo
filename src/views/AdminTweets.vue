<template>
  <div class="admin-tweets">
    <section class="center-view">
      <page-name-banner :banner-title="bannerTitle" />
      <admin-feed-list
        @after-tweet-delete="afterTweetDelete"
        :initial-tweets="tweets"
      />
    </section>
    <Toast :ToastMessage="ToastMessage" />
  </div>
</template>

<script>
import PageNameBanner from '../components/PageNameBanner.vue'
import AdminFeedList from '../components/admin/AdminFeedList.vue'
import adminAPI from '../api/admin.js'
import Toast from "../components/AlertToast.vue";

export default {
  components: {
    AdminFeedList,
    PageNameBanner,
    Toast,
  },
  data() {
    return {
      bannerTitle: '推文清單',
      tweets: [],
      ToastMessage: {
        message: "",
        dataStatus: "",
      },
    }
  },
  created() {
    this.fetchTweetsData()
  },
  methods: {
    async fetchTweetsData() {
      try {
        const { data } = await adminAPI.getAdminTweets()
        this.tweets = data
      } catch (error) {
        console.log(error)
        this.ToastMessage.message = `無法取得使用者推文，請稍後再試`
        this.ToastMessage.dataStatus = 'error'
      }
    },
    async afterTweetDelete({ tweetId }) {
      try {
        console.log('delete via API', tweetId)
        const {data} = await adminAPI.deleteTweet({ tweetId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.ToastMessage.message = `已成功刪除推文 (ID: ${tweetId})`
        this.ToastMessage.dataStatus = 'success'
      } catch (error) {
        console.log(error)
      }
      
    }
  }
}
</script>
