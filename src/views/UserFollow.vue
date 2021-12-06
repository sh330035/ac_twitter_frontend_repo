<template>
  <div class="test-page">
    <!-- 測試頁面，確認字體有拉到 SCSS 的樣式 -->
    <section class="center-view">
      <PageNameBanner :user="currentUser" />
      <FollowsNavPills />
      <FollowList
        :follows="this.follows"
        @after-add-follow="afterAddFollow"
        @after-delete-follow="afterDeleteFollow"
      />
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
import followListAPI from "../api/users";
import { mapState } from "vuex";

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
        id: 8,
        account: "",
        name: "",
        tweetsCount: -1,
      },
      follows: [],
      followPageStatus: "",
    };
  },
  beforeRouteUpdate(to, from, next) {
    const followType = to.query.follow ? to.query.follow : "followers";
    this.followPageStatus = followType;
    this.fetchUserFollow(this.user.id, followType);
    next();
  },
  methods: {
    async fetchUserFollow(userId, followType) {
      try {
        if (followType == "following") {
          const { data } = await followListAPI.getUserFollowings(userId);
          this.follows = data;
          return;
        } else {
          const { data } = await followListAPI.getUserFollowers(userId);
          this.follows = data;
          return;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 無法成功
    async afterAddFollow(userId) {
      try {
        const { data } = await followListAPI.addFollowing({ id: userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        console.log(data.message);

        this.follows = this.follows.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              isFollowed: true,
            };
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async afterDeleteFollow(userId) {
      try {
        const { data } = await followListAPI.deleteFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.follows = this.follows.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              isFollowed: false,
            };
          }
        });

        console.log("deleteFollow, success");
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    const { id: userId } = this.$route.params;
    const { follow = "" } = this.$route.query;

    if (follow) {
      this.followPageStatus = "following";
    } else {
      this.followPageStatus = "follower";
    }
    console.log(userId, follow);
    this.fetchUserFollow(userId, this.followPageStatus);
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>
