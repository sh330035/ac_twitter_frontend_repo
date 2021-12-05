<template>
  <div class="user-page">
    <section class="center-view">
      <page-name-banner :user="user" />
      <profile-card :initial-user="user" @after-toggle-notification="afterToggleNotification" @after-toggle-isFollowed="afterToggleIsFollowed" @show-setting-form="afterShowSettingForm" />
      <feeds-nav-pills />
      <user-feed-list :initial-user="user" :current-feeds="currentFeeds" :initial-feeds="feeds" @after-toggle-like="afterToggleLike"/>
      <profile-edit-modal v-show="showSettingForm" :initial-user="user" @close-setting-form="afterCloseSettingForm" @after-profile-form-submit="afterProfileFormSubmit" />
    </section>
    <section class="right-card">
      <popular-users-card />
    </section>
  </div>
</template>

<script>
import PageNameBanner from "../components/PageNameBanner.vue"
import ProfileCard from '../components/ProfileCard.vue'
import FeedsNavPills from '../components/FeedsNavPills.vue'
import UserFeedList from '../components/UserFeedList.vue'
import ProfileEditModal from '../components/ProfileEditModal.vue'
import PopularUsersCard from "../components/PopularUsersCard.vue"
import { mapState } from "vuex"

const dummyData = {
  user: {
    id: 1,
    account: "user1",
    email: "user1@example.com",
    name: "user1",
    avatar: "https://randomuser.me/api/portraits/women/82.jpg",
    cover: "https://loremflickr.com/320/240/city/?random=87.0724194526249",
    introduction:
      "Dolorum consequuntur quae quidem et at quia reiciendis molestiae voluptatem. Eligendi ex quis cupiditate natus sequiomnis. Magni consequuntur sed atque corruptiut.",
    role: "user",
    createdAt: "2021-11-30T10:01:31.000Z",
    updatedAt: "2021-11-30T10:01:31.000Z",
    followerCount: 137,
    followingCount: 12345,
    tweetsCount: 189,
    isCurrentUser: true,
    isFollowed: true,
    isNoticed: true,
    Tweets: [
      {
        "id": 80,
        "UserId": 1,
        "account": "user1",
        "name": "User1",
        "comment": "vitae molestiae deserunt",
        "avatar": "https://randomuser.me/api/portraits/women/82.jpg",
        "createdAt": "2021-12-04T10:14:55.000Z",
        "isLike": false,
        "replyCount": 45,
        "likeCount": 80,
      },
      {
        "id": 90,
        "UserId": 1,
        "account": "user1",
        "name": "User1",
        "comment": "vitae molestiae deserunt",
        "avatar": "https://randomuser.me/api/portraits/women/82.jpg",
        "createdAt": "2021-12-03T10:14:55.000Z",
        "isLike": false,
        "replyCount": 25,
        "likeCount": 90,
      },
      {
        "id": 808,
        "UserId": 1,
        "account": "user1",
        "name": "User1",
        "comment": "Lorem ipsum dolor sit amet consecteturelit. Nostrum velit ea repudiandae fugit temporibus sit!",
        "avatar": "https://randomuser.me/api/portraits/women/82.jpg",
        "createdAt": "2021-11-24T10:14:55.000Z",
        "isLike": true,
        "replyCount": 9,
        "likeCount": 18,
      },
      {
        "id": 111,
        "UserId": 1,
        "account": "user1",
        "name": "User1",
        "comment": "vitae molestiae des Non autem deleniti perspiciatis runt",
        "avatar": "https://randomuser.me/api/portraits/women/82.jpg",
        "createdAt": "2021-11-23T10:14:55.000Z",
        "isLike": true,
        "replyCount": 15,
        "likeCount": 81,
      },
      {
        "id": 50,
        "UserId": 1,
        "account": "user1",
        "name": "User1",
        "comment": "vitae molestiae Non autem deleniti",
        "avatar": "https://randomuser.me/api/portraits/women/82.jpg",
        "createdAt": "2021-11-03T10:14:55.000Z",
        "isLike": false,
        "replyCount": 38,
        "likeCount": 98,
      },
    ],
    Replies: [
      {
        "id": 1,
        "UserId": 50,
        "account": "user50",
        "name": "User50",
        "comment": "vitae molestiae deserunt",
        "avatar": "https://randomuser.me/api/portraits/men/5.jpg",
        "createdAt": "2021-12-03T10:14:55.000Z",
      },
      {
        "id": 6,
        "UserId": 6,
        "account": "user6",
        "name": "User6",
        "comment": "Non autem deleniti perspiciatis architecto.",
        "avatar": "https://randomuser.me/api/portraits/women/7.jpg",
        "createdAt": "2021-11-29T10:14:55.000Z",
      },
      {
        "id": 9,
        "UserId": 8,
        "account": "user8",
        "name": "User8",
        "comment": "Laboriosam aut fugit eaque molestiae aspernatur velit fugit laudantium.",
        "avatar": "https://randomuser.me/api/portraits/men/6.jpg",
        "createdAt": "2021-11-28T10:14:55.000Z",
      },
      {
        "id": 10,
        "UserId": 10,
        "account": "user10",
        "name": "User10",
        "comment": "fuga modi ipsa",
        "avatar": "https://randomuser.me/api/portraits/women/22.jpg",
        "createdAt": "2021-11-26T10:14:55.000Z",
      },
      {
        "id": 11,
        "UserId": 1,
        "account": "user1",
        "name": "User1",
        "comment": "vitae molestiae deserunt",
        "avatar": "https://randomuser.me/api/portraits/women/11.jpg",
        "createdAt": "2021-11-25T10:14:55.000Z",
      },
      {
        "id": 16,
        "UserId": 6,
        "account": "user6",
        "name": "User6",
        "comment": "Non autem deleniti perspiciatis architecto.",
        "avatar": "https://randomuser.me/api/portraits/men/6.jpg",
        "createdAt": "2021-11-24T10:14:55.000Z",
      },
      {
        "id": 19,
        "UserId": 8,
        "account": "user8",
        "name": "User8",
        "comment": "Laboriosam aut fugit eaque molestiae aspernatur velit fugit laudantium.",
        "avatar": "https://randomuser.me/api/portraits/women/17.jpg",
        "createdAt": "2021-11-23T10:14:55.000Z",
      },
      {
        "id": 20,
        "UserId": 10,
        "account": "user10",
        "name": "User10",
        "comment": "fuga modi ipsa",
        "avatar": "https://randomuser.me/api/portraits/women/6.jpg",
        "createdAt": "2021-11-22T10:14:55.000Z",
      },
      {
        "id": 36,
        "UserId": 6,
        "account": "user6",
        "name": "User6",
        "comment": "Non autem deleniti perspiciatis architecto.",
        "avatar": "https://randomuser.me/api/portraits/men/3.jpg",
        "createdAt": "2021-11-21T10:14:55.000Z",
      },
      {
        "id": 39,
        "UserId": 8,
        "account": "user8",
        "name": "User8",
        "comment": "Laboriosam aut fugit eaque molestiae aspernatur velit fugit laudantium.",
        "avatar": "https://randomuser.me/api/portraits/men/46.jpg",
        "createdAt": "2021-11-18T10:14:55.000Z",
      },
      {
        "id": 40,
        "UserId": 10,
        "account": "user10",
        "name": "User10",
        "comment": "fuga modi deleniti perspiciatis perspiciatis architecto ipsa",
        "avatar": "https://randomuser.me/api/portraits/women/44.jpg",
        "createdAt": "2021-11-06T10:14:55.000Z",
      },
      {
        "id": 45,
        "UserId": 15,
        "account": "user15",
        "name": "User15",
        "comment": "fugadeleniti perspiciatis modi ipsa",
        "avatar": "https://randomuser.me/api/portraits/women/36.jpg",
        "createdAt": "2021-11-05T10:14:55.000Z",
      },
      {
        "id": 49,
        "UserId": 152,
        "account": "user152",
        "name": "User152",
        "comment": "fuga perspiciatis architecto modi ipsa in ecpical",
        "avatar": "https://randomuser.me/api/portraits/men/16.jpg",
        "createdAt": "2021-10-06T10:14:55.000Z",
      }
    ],
    Likes: [
      {
        "id": 9,
        "UserId": 8,
        "account": "user8",
        "name": "User8",
        "comment": "Laboriosam aut fugit eaque molestiae aspernatur velit fugit laudantium.",
        "avatar": "https://randomuser.me/api/portraits/men/6.jpg",
        "createdAt": "2021-12-04T10:14:55.000Z",
        "isLike": true,
        "replyCount": 45,
        "likeCount": 80
      },
      {
        "id": 80,
        "UserId": 1,
        "account": "user1",
        "name": "User1",
        "comment": "vitae molestiae dolor sit amet consecte petur deserunt",
        "avatar": "https://randomuser.me/api/portraits/women/82.jpg",
        "createdAt": "2021-12-04T10:14:55.000Z",
        "isLike": true,
        "replyCount": 45,
        "likeCount": 80,
      },
      {
        "id": 49,
        "UserId": 152,
        "account": "user152",
        "name": "User152",
        "comment": "dolor sit amet consec tetur fuga modi ipsa",
        "avatar": "https://randomuser.me/api/portraits/women/16.jpg",
        "createdAt": "2021-11-26T10:14:55.000Z",
        "isLike": true,
        "replyCount": 39,
        "likeCount": 718
      },
      {
        "id": 493,
        "UserId": 152,
        "account": "user152",
        "name": "User152",
        "comment": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quidem?",
        "avatar": "https://randomuser.me/api/portraits/men/13.jpg",
        "createdAt": "2021-11-26T10:14:55.000Z",
        "isLike": true,
        "replyCount": 29,
        "likeCount": 71
      }
    ]
  },
}


export default {
  name: "user",
  components: {
    PageNameBanner,
    ProfileCard,
    FeedsNavPills,
    UserFeedList,
    ProfileEditModal,
    PopularUsersCard,
  },
  data() {
    return {
      user: {},
      currentFeeds: 'tweets',
      feeds: [],
      showSettingForm: false
    }
  },
  beforeRouteUpdate(to, from, next) {
    const feedsType = to.query.feeds ? to.query.feeds : 'tweets'
    this.currentFeeds = feedsType
    this.fetchFeedsData (feedsType)
    next()
  },
  methods: {
    fetchUserData(userId) {
      console.log("user id: ", userId)

      const {
        id,
        account,
        email,
        name,
        avatar,
        cover,
        introduction,
        role,
        createdAt,
        updatedAt,
        followerCount,
        followingCount,
        tweetsCount,
        isCurrentUser,
        isFollowed,
        isNoticed,
        tweets,
        Replies: replies,
        Likes: likes } = dummyData.user

      this.user = {
        id,
        account,
        email,
        name,
        avatar,
        cover,
        introduction,
        tweetsCount,
        role,
        createdAt,
        updatedAt,
        followerCount,
        followingCount,
        isCurrentUser,
        isFollowed,
        isNoticed,
        tweets,
        replies,
        likes
      }
    },
    fetchFeedsData (feedsType) {

      if (feedsType === 'tweets') {
        // Get from API
        // GET /api/users/:id/tweets

        this.feeds = dummyData.user.Tweets
      } else if (feedsType === 'reply') {
        // Get from API
        // GET /api/users/:id/replied_tweets

        this.feeds = dummyData.user.Replies
      } else if (feedsType === 'like') {
        // Get from API
        // GET /api/users/:id/likes
        this.feeds = dummyData.user.Likes
      }
 
    },
    afterToggleNotification (status) {
      // if (this.user.toggleIsFollowed) {
      //   API put 讓 toggleIsFollowed = true
      // } else {
      //   API put 讓 toggleIsFollowed = false
      // }
      console.log(`Notification: ${status}`)
    },
    afterToggleIsFollowed(status){
      // if (this.user.toggleIsFollowed) {
      //   API put 讓 toggleIsFollowed = true
      // } else {
      //   API put 讓 toggleIsFollowed = false
      // }
      console.log(`Toggle isFollowed status to ${status}`)
    },
    afterToggleLike({feedId, status}) {
      // if (status) {
      //   API put 讓 isLike = true
      // } else {
      //   API put 讓 isLike = false
      // }
      console.log(`Toggle isLike of id-${feedId} status to ${status}`)
    },
    afterShowSettingForm () {
      this.showSettingForm = true
    },
    afterCloseSettingForm () {
      this.showSettingForm = false
    },
    afterProfileFormSubmit (data) {
      console.log('submit profile form', data)
      // TODO : 串接 API
      this.showSettingForm = false
    }
  },
  created() {
    const { id: userId } = this.$route.params
    const feedsType = this.$route.query.feeds
    this.fetchUserData(userId)
    this.currentFeeds = feedsType ? feedsType :'tweets'
    this.fetchFeedsData (this.currentFeeds)
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>
