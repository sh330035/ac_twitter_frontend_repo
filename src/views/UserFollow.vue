<template>
  <div class="test-page">
    <!-- 測試頁面，確認字體有拉到 SCSS 的樣式 -->
    <section class="center-view">
      <PageNameBanner :user="user" />
      <FollowsNavPills />
      <FollowList />
    </section>
    <section class="right-card">
      <PopularUsersCard />
    </section>
  </div>
</template>

<script>
import PopularUsersCard from "../components/PopularUsersCard.vue";
import PageNameBanner from "../components/PageNameBanner.vue";
import FollowsNavPills from "../components/FollowsNavPills.vue";
import FollowList from "../components/FollowList.vue";
import { mapState } from "vuex";

const dummyData = {
  user: {
    id: 1,
    account: "user1",
    email: "user1@example.com",
    name: "user1",
    password: "$2a$10$jf.dLx/ohvbTS1y0yrelo.h0IBnw9baWWXM7jEYUkE2iGnRo1ngLa",
    avatar: "https://randomuser.me/api/portraits/women/82.jpg",
    cover: "https://loremflickr.com/320/240/city/?random=87.0724194526249",
    introduction:
      "In velit doloribus delectus est eum quia aut perferendis eveniet. Quas sint asperiores dolorem. Numquam et ipsa. Dolorum consequuntur quae quidem et at quia reiciendis molestiae voluptatem. Eligendi ex quis cupiditate natus sequi ratione illo repellendus omnis. Magni praesentium consequuntur sed qui atque corrupti ratione ut.",
    role: "user",
    createdAt: "2021-11-30T10:01:31.000Z",
    updatedAt: "2021-11-30T10:01:31.000Z",
    Followers: [],
    Followings: [
      {
        id: 3,
        account: "user3",
        email: "user3@example.com",
        name: "user3",
        password:
          "$2a$10$qqq64zIJpU/9pwc6j3daK.XdCE5tlpwOTOqoXQZ/9aUn99aQVYN.i",
        avatar:
          "https://randomuser.me/api/portraits/women/74.97165987082587.jpg",
        cover: "https://loremflickr.com/320/240/city/?random=43.85524454634675",
        introduction:
          "Ut nam cupiditate eligendi eos ullam. Vero corrupti delectus quia perferendis ducimus quia ratione tempora. Repellendus hic aspernatur ad quia molestiae blanditiis voluptatem aut eum. Animi nisi mollitia est possimus. Quo cumque sint aut dicta et dignissimos.",
        role: "user",
        createdAt: "2021-11-30T10:01:31.000Z",
        updatedAt: "2021-11-30T10:01:31.000Z",
        Followship: {
          followerId: 1,
          followingId: 3,
          createdAt: "2021-11-30T14:58:44.000Z",
          updatedAt: "2021-11-30T14:58:44.000Z",
        },
      },
    ],
    followerCount: 0,
  },
};

export default {
  name: "user-follow",
  components: {
    PopularUsersCard,
    PageNameBanner,
    FollowsNavPills,
    FollowList,
  },
  data() {
    return {
      user: {
        id: -1,
        account: "",
        name: "",
        tweetsCount: -1,
        Followers: [],
        Followings: [],
      },
    };
  },
  methods: {
    fetchUserFollow(userId) {
      console.log(userId, dummyData);
      this.user = {
        id: dummyData.user.id,
        account: dummyData.user.account,
        name: dummyData.user.name,
        tweetsCount: 20,
      };
    },
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUserFollow(userId);
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>
