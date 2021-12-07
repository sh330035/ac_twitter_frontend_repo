<template>
  <div class="test-page">
    <!-- 測試頁面，確認字體有拉到 SCSS 的樣式 -->
    <section class="center-view">
      <PageNameBanner :user="user" />
      <FollowsNavPills />
      <FollowList
        :follows="follows"
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
import userAPI from "../api/users";
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
        id: -1,
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
  created() {
    const { id: userId } = this.$route.params;
    const { follow = "" } = this.$route.query;

    if (follow) {
      this.followPageStatus = "following";
    } else {
      this.followPageStatus = "followers";
    }
    // 須轉成 Number 再傳
    this.fetchUserFollow(parseInt(userId, 10), this.followPageStatus);
    this.fetchUsers(parseInt(userId, 10));
  },
  methods: {
    // 取得目前頁面之用戶資料
    async fetchUsers(userId) {
      try {
        const { data } = await userAPI.getUser({ userId });

        this.user = {
          id: data.id,
          account: data.account,
          name: data.name,
          tweetsCount: data.TweetCount,
        };
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserFollow(userId, followType) {
      console.log(userId, followType);
      try {
        if (followType == "following") {
          const { data } = await userAPI.getUserFollowings(userId);
          this.follows = data;
          return;
        } else if (followType == "followers") {
          const { data } = await userAPI.getUserFollowers(userId);
          this.follows = data;
          return;
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 無法成功
    async afterAddFollow(userId) {
      try {
        const { data } = await userAPI.addFollowing({ id: userId });

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
        const { data } = await userAPI.deleteFollowing({ userId });

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

  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>
