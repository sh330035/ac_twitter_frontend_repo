<template>
  <div class="test-page">
    <section class="center-view">
      <PageNameBanner :user="user" />
      <FollowsNavPills />
      <FollowList
        :follows="follows"
        @after-add-follow="addFollowing"
        @after-delete-follow="deleteFollowing"
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
    async addFollowing(userId) {
      try {
        console.log("userId", userId);
        const id = { id: userId };

        if (this.currentUser.id == userId) {
          throw new Error("無法自己追蹤自己");
        }

        const { data } = await userAPI.addFollowing({ id });

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
        console.log("add error");
      }
    },
    async deleteFollowing(userId) {
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