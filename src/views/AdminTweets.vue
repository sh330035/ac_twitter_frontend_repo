<template>
  <div class="admin-tweets">
    <section class="center-view">
      <page-name-banner :banner-title="bannerTitle" />
      <admin-feed-list
        @after-tweet-delete="afterTweetDelete"
        :initial-tweets="tweets"
      />
    </section>
  </div>
</template>

<script>
import PageNameBanner from '../components/PageNameBanner.vue'
import AdminFeedList from '../components/admin/AdminFeedList.vue'

const dummyData = {
  tweets: [
    {
      "id": 1,
      "UserId": 1,
      "account": "user1",
      "name": "User1",
      "description": "vitae molestiae deserunt",
      "createdAt": "2021-11-30T10:14:55.000Z",
    },
    {
      "id": 6,
      "UserId": 6,
      "account": "user6",
      "name": "User6",
      "description": "Non autem deleniti perspiciatis architecto.",
      "createdAt": "2021-11-29T10:14:55.000Z",
    },
    {
      "id": 9,
      "UserId": 8,
      "account": "user8",
      "name": "User8",
      "description": "Laboriosam aut fugit eaque molestiae aspernatur velit fugit laudantium.",
      "createdAt": "2021-11-28T10:14:55.000Z",
    },
    {
      "id": 10,
      "UserId": 10,
      "account": "user10",
      "name": "User10",
      "description": "fuga modi ipsa",
      "createdAt": "2021-11-26T10:14:55.000Z",
    },
    {
      "id": 11,
      "UserId": 1,
      "account": "user1",
      "name": "User1",
      "description": "vitae molestiae deserunt",
      "createdAt": "2021-11-25T10:14:55.000Z",
    },
    {
      "id": 16,
      "UserId": 6,
      "account": "user6",
      "name": "User6",
      "description": "Non autem deleniti perspiciatis architecto.",
      "createdAt": "2021-11-24T10:14:55.000Z",
    },
    {
      "id": 19,
      "UserId": 8,
      "account": "user8",
      "name": "User8",
      "description": "Laboriosam aut fugit eaque molestiae aspernatur velit fugit laudantium.",
      "createdAt": "2021-11-23T10:14:55.000Z",
    },
    {
      "id": 20,
      "UserId": 10,
      "account": "user10",
      "name": "User10",
      "description": "fuga modi ipsa",
      "createdAt": "2021-11-22T10:14:55.000Z",
    },
    {
      "id": 36,
      "UserId": 6,
      "account": "user6",
      "name": "User6",
      "description": "Non autem deleniti perspiciatis architecto.",
      "createdAt": "2021-11-21T10:14:55.000Z",
    },
    {
      "id": 39,
      "UserId": 8,
      "account": "user8",
      "name": "User8",
      "description": "Laboriosam aut fugit eaque molestiae aspernatur velit fugit laudantium.",
      "createdAt": "2021-11-18T10:14:55.000Z",
    },
    {
      "id": 40,
      "UserId": 10,
      "account": "user10",
      "name": "User10",
      "description": "fuga modi deleniti perspiciatis ipsa",
      "createdAt": "2021-11-06T10:14:55.000Z",
    },
    {
      "id": 45,
      "UserId": 15,
      "account": "user15",
      "name": "User15",
      "description": "fugadeleniti perspiciatis modi ipsa",
      "createdAt": "2021-11-05T10:14:55.000Z",
    },
    {
      "id": 49,
      "UserId": 152,
      "account": "user152",
      "name": "User152",
      "description": "fuga modi ipsa",
      "createdAt": "2021-10-06T10:14:55.000Z",
    }
  ]
}

export default {
  components: {
    AdminFeedList,
    PageNameBanner,
  },
  data() {
    return {
      bannerTitle: '推文清單',
      tweets: []
    }
  },
  created() {
    this.fetchTweetsData()
  },
  methods: {
    fetchTweetsData() {
      this.tweets = dummyData.tweets
    },
    afterTweetDelete({ tweetId }) {
      console.log('delete via API', tweetId)
    }
  }
}
</script>
