<template>
  <div class="admin-users">
    <section class="center-view">
      <page-name-banner :banner-title="bannerTitle" />
      <admin-user-cards :users="users" />
    </section>
  </div>
</template>

<script>
import PageNameBanner from '../components/PageNameBanner.vue'
import AdminUserCards from '../components/admin/AdminUserCards.vue'

const dummyData = {
  users: [
    {
      "id": 1,
      "account": "user1",
      "name": "user1",
      "avatar": "https://randomuser.me/api/portraits/women/6.jpg",
      "cover": "https://loremflickr.com/320/240/city/?random=21",
      "tweetCount": 100000,
      "likeCount": 2800000,
      "followerCount": 24500,
      "followingCount": 210
    },
    {
      "id": 2,
      "account": "user2",
      "name": "user2",
      "avatar": "https://randomuser.me/api/portraits/men/23.jpg",
      "cover": "https://loremflickr.com/320/240/city/?random=11",
      "tweetCount": 14580,
      "likeCount": 379000,
      "followerCount": 3287,
      "followingCount": 140
    },
    {
      "id": 3,
      "account": "user3",
      "name": "user3",
      "avatar": "https://randomuser.me/api/portraits/men/23.jpg",
      "cover": "https://loremflickr.com/320/240/city/?random=11",
      "tweetCount": 14580,
      "likeCount": 379000,
      "followerCount": 3287,
      "followingCount": 140
    },
    {
      "id": 4,
      "account": "user4",
      "name": "user4",
      "avatar": "https://randomuser.me/api/portraits/men/23.jpg",
      "cover": "https://loremflickr.com/320/240/city/?random=11",
      "tweetCount": 14580,
      "likeCount": 379000,
      "followerCount": 3287,
      "followingCount": 140
    },
    {
      "id": 5,
      "account": "user5",
      "name": "user5",
      "avatar": "https://randomuser.me/api/portraits/men/23.jpg",
      "cover": "https://loremflickr.com/320/240/city/?random=11",
      "tweetCount": 14580,
      "likeCount": 379000,
      "followerCount": 3287,
      "followingCount": 140
    },
    {
      "id": 6,
      "account": "user6",
      "name": "user6",
      "avatar": "https://randomuser.me/api/portraits/men/23.jpg",
      "cover": "https://loremflickr.com/320/240/city/?random=11",
      "tweetCount": 14580,
      "likeCount": 379000,
      "followerCount": 3287,
      "followingCount": 140
    },
  ]
}

export default {
  components: {
    AdminUserCards,
    PageNameBanner,
  },
  data() {
    return {
      bannerTitle: '使用者列表',
      users: []
    }
  },
  created () {
    this.fetchUsersData()
  },
  methods: {
    fetchUsersData () {
      this.users = dummyData.users
    },
  }
}
</script>
